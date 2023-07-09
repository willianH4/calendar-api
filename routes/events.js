/* 
    Routes of Events / CRUD
    host + /api/events
*/

const { Router } = require('express');
const router = Router();
const { validateFields } = require('../middlewares/validate-fields');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

// Validate All request with token
router.use( validateJWT );

router.get('/', getEvents);

router.post('/', 
    [
        check('title', 'El campo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validateFields
    ],
    createEvent
);

router.put('/:id',
    [
        check('title', 'El campo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validateFields
    ],
    updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;