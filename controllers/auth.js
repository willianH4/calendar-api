const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

        res.status(201).json({
            ok: true,
            uid: user.id,
            userName: user.userName
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error intentalo mas tarde'
        })
    }
}

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    res.status(200).json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}