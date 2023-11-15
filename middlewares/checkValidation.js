const { check } = require('express-validator');

function userLoginValidator() {
    return [
        check('email', 'El email es inválido').isEmail(),
        check('password', 'El password es obligatorio').exists(),
        check('password').isLength({ min: 4, max: 9 }).withMessage('Longitud del password es inválida')
    ]
}

module.exports = {
    userLoginValidator,
}
