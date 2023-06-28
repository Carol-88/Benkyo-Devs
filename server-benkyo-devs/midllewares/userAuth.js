const { getConnection } = require('../src/db/db');
const jwt = require('jsonwebtoken');
const { generateError } = require('../src/helpers/generateError');
require('dotenv').config();

const userAuth = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const { authorization } = req.headers;

        if (!authorization) {
            throw generateError('Falta cabecera de autenticación', 401);
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            console.error(error);
            throw generateError('El token no es válido', 401);
        }

        req.user = tokenInfo;

        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    userAuth,
};
