'use strict'

const { validateData } = require('../utils/validate')
const Event = require('./event.model')

exports.test = (req, res) => {
    res.send({ message: 'Test events' })
}

exports.addEvent = async (req, res) => {
    try {

        let data = req.body;

        let params = {
            name: data.name,
            description: data.description,
            type: data.type,
            maxPersons: data.maxPersons,
            price: data.price,
            hotel: data.hotel
        }

        let validate = validateData(params);

        if (validate) {
            return res.status(400).send({message: 'You can not put empty information.'})
        }

        if (data.maxPersons <= 0) {
            return res.status(400).send({ message: `The max capacity of the event can't be negative or zero.` })
        } else if (data.price < 0) {
            return res.status(400).send({ message: `The price of the event can't be negative` })
        }

        let newEvent = new Event(data);
        await newEvent.save();

        return res.send({ message: 'Event saved successfully', newEvent })

    } catch (err) {

        if (err.errors.type.name == 'ValidatorError') {
            console.error('Validation error: ', err.message);
            return res.status(400).send({ message: 'Some params are required or you put an invalid type event.' });
        }

        console.error(err)
        return res.status(500).send({ message: 'Error saving the event', err })

    }
}

exports.getEvents = async (req, res) => {
    try {

        let events = await Event.find().populate('hotel');

        return res.send({ message: 'Events available: ', events })

    } catch (err) {

        console.error(err)
        return res.status(500).send({ message: 'Error getting events' })

    }
}

exports.getEventsByHotel = async (req, res) => {
    try {

        let idHotel = req.params.id;

        let events = await Event.find({hotel: idHotel}).populate('hotel');

        return res.send({ message: 'Events available: ', events })

    } catch (err) {

        console.error(err)
        return res.status(500).send({ message: 'Error getting the events of the hotel' })

    }
}

exports.getEvent = async (req, res) => {
    try {

        let idEvent = req.params.id;

        let event = await Event.findOne({ _id: idEvent })

        if (!event) {
            return res.status(404).send({ message: 'The event was not found.' })
        }

        return res.send({ message: 'Service Found', event })

    } catch (err) {

        console.error(err)
        return res.status(500).send({ message: 'Error getting the event' })

    }
}

exports.deleteEvent = async (req, res) => {
    try {

        let idEvent = req.params.id;

        let deleteEvent = await Event.findOneAndDelete({ _id: idEvent })

        if (!deleteEvent) {
            return res.status(404).send({ message: 'The event was not found.' })
        }

        return res.send({ message: 'The event has been deleted', deleteEvent })

    } catch (err) {

        console.error(err);
        return res.status(500).send({ message: 'Error deleting the event' })

    }
}

exports.updateEvent = async (req, res) => {
    try {

        let idEvent = req.params.id;

        let data = req.body;

        let params = {
            name: data.name,
            description: data.description,
            type: data.type,
            maxPersons: data.maxPersons,
            price: data.price,
            hotel: data.hotel
        }

        let validate = validateData(params);

        if (validate) {
            return res.status(400).send({message: 'You can not put empty information.'})
        }

        if (data.maxPersons !== '') {
            if (data.maxPersons <= 0) {
                return res.status(400).send({ message: `The max capacity of the event can't be negative or zero.` })
            } else if (data.price < 0) {
                return res.status(400).send({ message: `The price of the event can't be negative` })
            }
        }

        let updateEvent = await Event.findOneAndUpdate(
            { _id: idEvent },
            params,
            { new: true, runValidators: true }
        )

        if (!updateEvent) {
            return res.status(404).send({ message: 'The event was not found.' })
        }

        return res.send({ message: 'The event was updated successfully', updateEvent })

    } catch (err) {
        if (err.errors.type.name == 'ValidatorError') {
            console.error('Validation error: ', err.message);
            return res.status(400).send({ message: 'Some params are required or you put an invalid type event.' });
        }
        console.error(err)
        return res.status(500).send({ message: 'Error updating the event' })
    }
}