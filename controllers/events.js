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

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById( eventId );

        if( !event ) {
           return res.status(404).json({
                ok: false,
                msg: `No existe el evento: ${eventId}`
            });
        };

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            });
        };

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        return res.json({
            ok: true,
            event: eventUpdate
        });

    } catch (error) {
       return res.status(500).json({
            ok: false,
            msg: 'Intentalo mas tarde'
        })
    }

}

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById( eventId );

        if( !event ) {
           return res.status(404).json({
                ok: false,
                msg: `No existe el evento: ${eventId}`
            });
        };

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            });
        };

        await Event.findByIdAndDelete( eventId );

       return res.json({
            ok: true,
            msg: `Se elimino el evento ${eventId}`
        });

    } catch (error) {
       return res.status(500).json({
            ok: false,
            msg: 'Intentalo mas tarde'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}