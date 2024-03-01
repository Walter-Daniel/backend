const jwt = require('jsonwebtoken');
const secretSeed = process.env.secretSeed;

const generateJWT = ( user ) => {

    return new Promise( (resolve, reject) => {

        jwt.sign( user, secretSeed, {
            expiresIn: '2h'
        }, (err, token) => {

            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve( token );

        } );
    } );
}

module.exports={
    generateJWT
}