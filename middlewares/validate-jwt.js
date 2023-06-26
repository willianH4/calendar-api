const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {
    // x-token headers
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_KEY
        );

        console.log({uid: uid, name: name})
        req.uid = uid;
        req.userName = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }

    next();
}

module.exports = {
    validateJWT
}