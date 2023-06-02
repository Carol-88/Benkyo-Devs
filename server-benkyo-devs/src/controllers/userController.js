const { getConnection } = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers/generateError');
const { createUser, getUserByEmail, getUserById } = require('../db/users');

const newUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            throw generateError('Debes introducir un email y una contraseña válidos', 400);
        }

        const id = await createUser(name, email, password);

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

        const idUserAuth = req.userId;
        
        const { newName, newEmail } = req.body;
        
        if (!newName && !newEmail) {
            throw generateError('No has modificado nada', 400);
        }

        const [user] = await connection.query(
            `SELECT * FROM user WHERE name = ? OR email = ?`,
            [newName, newEmail]    
        );

        if (user.length > 0) {
            throw new generateError('El email o nombre de usuario no disponible');
        }

        const [userAuth] = await connection.query(
            `SELECT name, email FROM user WHERE id = ?`,
            [idUserAuth]
        );

        await connection.query(
            `UPDATE user SET name = ?, email = ? WHERE id = ?`,
            [newEmail || userAuth[0].email, newName || userAuth[0].name, idUserAuth]
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

        const payload = { id: user.id };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: token,
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