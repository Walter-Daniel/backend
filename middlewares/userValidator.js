const { body } = require('express-validator');

function userLoginValidator() {
    return [
        body('email').exists().withMessage('El email es obligatorio'),
        body('email', 'El email es inválido').isEmail(),
        body('password', 'El password es obligatorio').exists(),
        body('password').isLength({ min: 4, max: 9 }).withMessage('Longitud del password es inválida')
    ]
}

module.exports = userLoginValidator
