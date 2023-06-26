const { response } = require('express')

const getEvents = (req, res) => {
    return res.json({
        ok: true,
        msg: 'getEvents'
    });
}

const createEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'createEvent'
    });
}

const updateEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'updateEvent'
    });
}

const deleteEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'deleteEvent'
    });
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}