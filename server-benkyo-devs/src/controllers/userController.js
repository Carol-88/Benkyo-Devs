const { getConnection } = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers/generateError');
const { createUser, getUserByEmail, getUserById } = require('../db/users');

const newUserController = async (req, res, next) => {
    try {
        const { name, username, description, email, password } = req.body;

        if(!name || !username || !description || !email || !password) {
            throw generateError('Debes introducir un email y una contraseña válidos', 400);
        }

        const id = await createUser(name, username, description, email, password);

        console.log(id);

        res.send({
            status: 'Ok',
            message: `User created with id: ${id}`,
        });

    } catch(error) {
        next(error);
    }
};

const getUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await getUserById(id);

        console.log(user);

        res.send({
            status: 'ok',
            data: user,
        });

    } catch(error) {
        next(error);
    }
};

const editUserController = async (req, res, next) => {
    let connection;
  
    try {
        connection = await getConnection();

        const idUserAuth = req.userAuth.id;
        
        const { newUserame, newEmail } = req.body;
        
        if (!newUserame && !newEmail) {
            throw generateError('No has modificado nada', 400);
        }

        const [user] = await connection.query(
            `SELECT * FROM user WHERE username = ? OR email = ?`,
            [newUserame, newEmail]    
        );

        if (user.length > 0) {
            throw generateError('El email o nombre de usuario no disponible');
        }

        const [userAuth] = await connection.query(
            `SELECT username, email FROM user WHERE id = ?`,
            [idUserAuth]
        );

        await connection.query(
            `UPDATE user SET email = ?, username = ? WHERE id = ?`,
            [newEmail || userAuth[0].email, newUserame || userAuth[0].username, idUserAuth]
        );

        res.send({
            status: 'Ok',
            message: `Datos del usuario con id ${idUserAuth} modificados con éxito`,
        });
    } catch (error){
        next(error);
    }
}

const loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            throw generateError('Debes introducir un email y una contraseña válidos', 400);
        }

        const user = await getUserByEmail(email);

        const validPassword = await bcrypt.compare(password, user.password); 

        if(!validPassword) {
            throw generateError('Email o contraseña incorrectos', 401);
        }

        const tokenInfo = { id: user.id };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            message: 'Sesión iniciada con éxito',
            authToken: token,
        });

    } catch(error) {
        next(error);
    } 
};


module.exports = {
    newUserController,
    getUserController,
    loginController,
    editUserController,
};