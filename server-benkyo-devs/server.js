require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const v1UserRouter = require('./src/v1/routes/userRoutes');
const v1CardRouter = require('./src/v1/routes/cardRoutes');
const v1DeckRouter = require('./src/v1/routes/deckRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev')); //Registra el tipo de petición HTTP y la muestra por consola
app.use(express.json()); //Parsea los json recogidos en el req.body
app.use(fileUpload()); //Permite leer el body en formato form-data

app.use('/public', express.static('public'));

app.use('/api/v1/user', v1UserRouter);
app.use('/api/v1/card', v1CardRouter); //https://api/v1/cards + endpoints en v1CardRouter de la carpeta routes
app.use('/api/v1/deck', v1DeckRouter);

app.use((error, req, res, next) => {
    // Middleware de gestión de errores genéricos
    console.error(error);

    res.status(error.httpSatus || 500).send({
        status: 'error',
        message: error.message,
    });
});

app.listen(PORT, () => {
    console.log(`Sever listening on port: ${PORT}`);
});
