const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({
            email
        });
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }
        
        user = new User( req.body );
        const salt = bcrypt.genSaltSync(); // generated salt for password
        user.password = bcrypt.hashSync( password, salt ); // password
        await user.save();

        // generate JWT
        const token = await generateJWT(user.id, user.userName);

        res.status(201).json({
            ok: true,
            uid: user.id,
            userName: user.userName,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error intentalo mas tarde'
        });
    }
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({
            email
        });
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // match passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // generate JWT
        const token = await generateJWT(user.id, user.userName);

        res.json({
            ok: true,
            uid: user.id,
            userName: user.userName,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error intentalo mas tarde'
        });
    }
}

const renewToken = async(req, res = response) => {

    const { uid, name } = req;
    // generate new JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}