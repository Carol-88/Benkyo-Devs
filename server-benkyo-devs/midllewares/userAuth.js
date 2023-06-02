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
      throw generateError('Header Authorization Missing', 401);
    }

    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('El token no es válido', 401);
    }

    const [user] = await connection.query(
      `SELECT * FROM user WHERE id = ?`,
      [token.id]
    );

    if (user.length < 1) {
        throw generateError('El token no es válido', 401); // Unauthorized
    }

    req.userId = token.id;

    next();
  } catch (error) {
    next(error);
  }
  finally {
    if (connection) connection.release();
  }
};

module.exports = {
    userAuth,
};
