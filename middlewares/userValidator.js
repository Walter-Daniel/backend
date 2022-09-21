const { body, validationResult } = require('express-validator');

function userLoginValidator() {
    return [
        // body('email').exists().withMessage('El email es obligatorio'),
        // body('email', 'El email es inválido').isEmail(),

        body('email').isEmail().normalizeEmail().withMessage('Invalid Email').exists(),
        body('password', 'El password es obligatorio').exists(),
        // body('password').isLength({ min: 4, max: 9 }).withMessage('Longitud del password es inválida')
    ]
}

const validate = (req, res, next) => {
    console.log('segundo')
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        next();
    }
    const extractedErrors = errors.array().map(error => {
        console.log(error);
        return {
            [error.param]: error.msg
        }
    })
    return res.status(422).send({
        ok: false,
        errors: extractedErrors
    })
};


module.exports = {
    userLoginValidator,
    validate
}