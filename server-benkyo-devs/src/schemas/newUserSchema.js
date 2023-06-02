const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    
    name: Joi.string()
        .required()
        .min(3)
        .max(30)
        .regex(/[A-Za-z0-9]/)
        .error((error) => {
            //Pendiente
        }),
    email: Joi.email()
        .required()
        .error((error) => {
           //Pendiente
        }),
    passsword: Joi.string()
        .min(8)
        .max(30)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
        .required()
        .messages({
            'string.pattern.base': 'La contraseña debe contener al menos una letra mayúscula, otra minúscula, un número, un caracter especial, y una longitud entre 8 y 30 caracteres',
          })
        .error((error) => {
           //Pendiente
        }),
});

module.exports = newUserSchema;