const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        next()
    } else {
        const extractedErrors = errors.array().map(err => {
            return {
                [err.param]: err.msg
            }
        })
        return res.status(422).send({
            ok: false,
            errors: extractedErrors
        })
        }
};

module.exports = validate