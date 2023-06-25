/* 
    Routes of User / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post('/new', 
    [ /**midledwares */
        check('userName', 'El nombre es obligarorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
        validateFields  
    ], 
    createUser
);

router.post('/', 
[ /**midledwares */
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
    ],
    loginUser
);

router.get('/renew',validateJWT, renewToken);

module.exports = router;

