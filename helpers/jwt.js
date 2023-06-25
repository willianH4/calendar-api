const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid, name };
        jwt.sign( payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );
        })
    })

}

module.exports = {
    generateJWT
}