/* 
    Routes of User / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

router.post('/new', 
    [ /**midledwares */
        check('name', 'El nombre es obligarorio').not().isEmpty(),
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

router.get('/renew', renewToken);

module.exports = router;

