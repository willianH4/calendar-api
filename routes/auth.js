/* 
    Routes of User / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');

router.post('/new', createUser);

router.post('/', loginUser);

router.get('/renew', renewToken);

module.exports = router;

