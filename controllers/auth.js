const { response, request } = require('express');

const createUser = (req, res = response) => {

    const { name, email, password } = req.body;

    res.json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
    });
}

const loginUser = (req, res) => {
    res.json({
        ok: true,
        msg: 'login'
    });
}

const renewToken = (req, res) => {
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