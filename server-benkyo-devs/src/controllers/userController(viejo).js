const { getConnection } = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers/generateError');
// const { newUserSchema } = require('../schemas/newUserSchema');
// const { validateSchema } = require('../helpers/validateSchema');
const { deleteAvatar, saveAvatar } = require('../helpers/editAvatar');
const { createUser, getUserByEmail, getUserById } = require('../db/users');

const newUserController = async (req, res, next) => {
    try {
        // const data = req.body;
        
        // console.log(data);
        
        // await validateSchema(newUserSchema, data);

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

const editUserInfoController = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const idUserAuth = req.userAuth.id;

        const { name, description } = req.body;

        if(!name && !description) {
            throw generateError('No has modificado nada', 400)
        }

        const [user] = await connection.query(
            `SELECT name, description FROM user WHERE id = ?`,
            [idUserAuth]
        );

        await connection.query(
            `UPDATE user SET name = ?, description = ? WHERE id = ?`,
            [
                name || user[0].name,
                description || user[0].description,
                idUserAuth,
            ]
        )

        res.send({
            status: 'Ok',
            message: `Usuario con id ${idUserAuth} modificado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

const deleteUserController = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const idUserAuth = req.userAuth.id;

        const { password } = req.body;

        if(!password) {
            throw generateError('Debes introducir la contraseña', 400);
        }

        const [user] = await connection.query(
            `SELECT password FROM user WHERE id = ?`,
            [idUserAuth]
        );

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            throw generateError('La contraseña no es válida', 401);
        }

        await connection.query(
            `DELETE FROM user WHERE id = ?`,
            [idUserAuth]
        );

        res.send({
            status: 'Ok',
            message: `Usuario con id ${idUserAuth} eliminado`,
        })
    } catch (error) {
        
    } finally {
        if (connection) connection.release();
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

const editPasswordController = async (req, res,next) => {
    let connection;

    try {
        connection = await getConnection();

        const idUserAuth = req.userAuth.id;

        const { email, newPass, confirmNewPass } = req.body;

        if (!email || !newPass || !confirmNewPass) {
            throw generateError('Faltan datos obligatorios', 400);
        }

        if (newPass !== confirmNewPass) {
            throw generateError('Las contraseñas no coinciden');
        }

        const [user] = await connection.query(
            `SELECT email FROM user WHERE id = ?`,
            [idUserAuth]
        );

        if (email !== user[0].email) {
            throw generateError('El email no coincide con el email del login', 401);
        }

        const passwordHash = await bcrypt.hash(newPass, 8);

        await connection.query(
            `UPDATE user SET password = ? WHERE id = ?`,
            [passwordHash, idUserAuth,]
        );

        res.send({
            status: 'ok',
            message: 'Contraseña modificada con éxito',
        }); 
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }   
}

const editAvatarController = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const idUserAuth = req.userAuth.id;

        if (!req.files || !req.files.avatar) {
            throw generateError('Debes indicar el nuevo avatar de usuario'), 400;
        }

        const [user] = await connection.query(
            `SELECT avatar FROM user WHERE id = ?`,
            [idUserAuth]
        );

        console.log(user[0].avatar);

        if (user[0].avatar) {
            await deleteAvatar(user[0].avatar);
        }

        console.log(req.files.avatar);

        const avatarName = await saveAvatar(req.files.avatar);

        await connection.query(
            `UPDATE user SET avatar = ? WHERE id = ?`,
            [avatarName, idUserAuth,]
        );

        res.send({
            status: 'Ok',
            message: 'Avatar de usuario modificado con éxito',
        });
    } catch (error) {
        next(error)
    } finally {
        if (connection) connection.release()
    }
};



module.exports = {
    newUserController,
    getUserController,
    loginController,
    editUserController,
    editUserInfoController,
    deleteUserController,
    editPasswordController,
    editAvatarController,
};