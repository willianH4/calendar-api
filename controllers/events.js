const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res) => {

    const events = await Event.find()
                                .populate('user', 'userName');

    return res.json({
        ok: true,
        events
    });
}

const createEvent = async(req, res = response) => {
    
    const event = new Event( req.body );

    try {
       event.user = req.uid;
       const eventSave = await event.save();
        res.json({
            ok: true,
            evento: eventSave
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error intentalo mas tarde'
        });
    }
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