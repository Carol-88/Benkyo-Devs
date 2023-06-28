const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { saveAvatar, deleteAvatar } = require('../helpers/editAvatar');

const { createUserQuery, getUserByIdQuery, getUserByEmailQuery, editUserQuery } = require('../db/usersQueries');

const createUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            console.log(username, email, password);
            throw generateError('Debes introducir un email y una contraseña válidos', 400);
        }

        await createUserQuery(username, email, password);

        res.send({
            code: 200,
            status: 'ok',
            message: `Usuario ${username} creado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

const getUserIdController = async (req, res, next) => {
    try {
        const user = await getUserByIdQuery(req.params.id);

        res.send({
            code: 200,
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log(email, password);
            throw generateError('Faltan campos', 400);
        }

        const user = await getUserByEmailQuery(email);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            generateError('Contraseña incorrecta', 401);
        }

        const userInfo = {
            id: user.id,
            username: user.username,
        };

        const token = jwt.sign(userInfo, SECRET, {
            expiresIn: '7d',
        });

        res.send({
            code: 200,
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

const editUserController = async (req, res, next) => {
    try {
        const user = await getUserByIdQuery(req.user.id);
        const { updateUsername, updateDescription } = req.body;

        let updateAvatar = user.avatar;

        if (req.files && req.files.avatar) {
            const { avatar } = req.files;

            if (user.avatar !== null) {
                await deleteAvatar(user.avatar);
            }

            updateAvatar = await saveAvatar(avatar);
        }

        await editUserQuery(updateUsername, updateDescription, updateAvatar, req.user.id);

        const updatedUser = await getUserByIdQuery(req.user.id);

        res.send({
            code: 200,
            status: 'ok',
            message: 'Usuario actualizado',
            data: updatedUser,
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getUserIdController,
    createUserController,
    loginController,
    editUserController,
};
