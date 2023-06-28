const { getConnection } = require('./db');
const { generateError } = require('../helpers/generateError');
const bcrypt = require('bcrypt');

const createUserQuery = async (username, email, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [user] = await connection.query(`SELECT id FROM user WHERE email = ?`, [email]);
        if (user.length > 0) {
            throw generateError('Ya existe un usuario con esa dirección de correo', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        await connection.query(`INSERT INTO user (username, email, password) VALUE(?, ?, ?)`, [username, email, hashedPassword]);
    } finally {
        if (connection) connection.release();
    }
};

const getUserByIdQuery = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`SELECT id, name, username, description, avatar, email FROM user WHERE id = ?`, [id]);

        if (result.length < 1) {
            throw generateError('No hay ningún usuario con ese id', 404);
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

const getUserByEmailQuery = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`SELECT id, username, password FROM user WHERE email = ?`, [email]);

        if (result.length < 1) {
            throw generateError('No hay ningún usuario con ese email', 404);
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

const editUserQuery = async (username, description, avatar, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        if (username) {
            const [result] = await connection.query(`SELECT id FROM user WHERE username = ?`, [username]);

            if (result.length > 0) {
                generateError('Ya existe un usuario con este nombre', 403);
            }

            await connection.query(`UPDATE user SET username = ? WHERE id = ?`, [username, idUser]);
        }

        if (description) {
            await connection.query(`UPDATE user SET description = ? WHERE id = ?`, [description, idUser]);
        }

        if (avatar) {
            await connection.query(`UPDATE user SET avatar = ? WHERE id = ?`, [avatar, idUser]);
        }
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    createUserQuery,
    getUserByIdQuery,
    getUserByEmailQuery,
    editUserQuery,
};
