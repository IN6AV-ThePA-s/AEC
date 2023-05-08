'use strict'

const {validateData} = require('../utils/validate')
const Event = require('./event.model')

exports.test = (req, res) => {
    res.send({ message: 'Test events' })
}

exports.addEvent = async(req,res)=>{
    try {

        let data = req.body;

        let params = {
            name: data.name,
            type: data.type,
            maxPersons: data.maxPersons,
            price: data.price
        }

        let validate = validateData(params);

        if (validate) {
            return res.status(400).send(validate)
        }

        if (data.maxPersons <= 0) {
            return res.status(400).send({message: `The max capacity of the event can't be negative or zero.`})
        }else if (data.price < 0) {
            return res.status(400).send({message: `The price of the event can't be negative`})
        }

        let newEvent = new Event(data);
        await newEvent.save();

        return res.send({message:'Event saved successfully', newEvent})

    } catch (err) {

        console.error(err)
        return res.status(500).send({message: 'Error saving the event', })

    }
}