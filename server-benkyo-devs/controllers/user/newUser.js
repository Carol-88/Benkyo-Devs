/* 
    Controlador para el registro de un nuevo usuario
*/

const getDB = require('../../db/getDB');
const {
    generateError,
    generateRandomCode,
    verifyEmail,
} = require('../../helpers');
const bcrypt = require('bcrypt');

// Declaramos la variable que establecerá lo "complicada" que encriptará la contraseña
const saltRounds = 10;

const newUser = async (req, res, next) => {
    let connection;

    try {
        // Abrimos una conexión a la base de datos
        connection = await getDB();

        // Obtenemos los campos necesarios del req.body
        const { username, password } = req.body;

        // Comprobamos que ha introducido todos los campos obligatorios
        if (!username || !password) {
            // Generamos un error con el mensaje correspondiente
            throw generateError('Faltan datos obligatorios.', 400); // Bad Request
        }

        // Comprobamos que el  username no esté ya en la base de datos
        const [user] = await connection.query(
            `SELECT id FROM user WHERE username = ?`,
            [username]
        );

        // Si la logitud de la variable usuario (array) es mayor de 0, el email ya existe
        if (user.length > 0) {
            // Si el email ya existe lanzamos un error
            throw generateError(
                'Ya existe un usuario con ese username en la base de datos',
                409
            ); // Conflict
        }

        // Si la logitud de la variable usuario (array) es mayor de 0, el email ya existe
        if (user.length > 0) {
            // Si el email ya existe lanzamos un error
            throw generateError(
                `${username} ya existe en la base de datos`,
                409
            ); // Conflict
        }

        // Usamos la dependencia bcrypt para encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // // Generamos el codigo de registro aleatorio para el usuario
        // const registrationCode = generateRandomCode(40);

        // Guardamos el nuevo usuario
        await connection.query(
            `INSERT INTO user (username, password, registrationCode)
            VALUES (?, ?, ?, ?)`,
            [username, email, hashedPassword]
        );

        // Enviamos el email de registro
        await verifyEmail(email, registrationCode);

        // Enviamos la respuesta
        res.send({
            status: 'Ok',
            message:
                '¡Usuario registrado con éxito comprueba tu email para activarlo!',
        });
    } catch (error) {
        // En caso de que ocurra algun error, lo pasamos
        next(error);
    } finally {
        // Siempre, al final, cerramos la conexion con la BBDD
        if (connection) connection.release();
    }
};

// Exportamos la funcion
module.exports = newUser;
