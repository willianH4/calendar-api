const { Router } = require('express');
const router = Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', validateJWT, getEvents);

router.post('/', validateJWT, createEvent);

router.put('/:id', validateJWT, updateEvent);

router.delete('/:id', validateJWT, deleteEvent);

module.exports = router;