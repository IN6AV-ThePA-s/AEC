'use strict'
const Client = require('../user/user.model')
const Room = require('../room/room.model')
const Service = require('../service/service.model')
const Event = require('../event/event.model')
const reservationModel = require('./reservation.model')

exports.test = (req, res) => {
    res.send({ message: 'Test reservations '})
} 

exports.addReservation = async(req,res) =>{
    try {
        //obtener los datos 
        let data = req.body
        const reservation = await reservationModel.find()
        const cod = reservation.length
        //validar que los datos que dependen de otras entidades existan
        //Client
        let existsClient = await Client.findOne({id:data.user,role:'CLIENT'})
        if(!existsClient) return res.status(404).send({message:'User not found or not be client'})
        // //Room
        let existsRoom = await Room.findOne({id:data.room})
        if(!existsRoom) return res.status(404).send({message:'Room not found'})
        // //Service
        let existsService = await Room.findOne({id:data.service})
        if(!existsService) return res.status(404).send({message:'Service not found'})
        // //Event
        let existsEvent = await Room.findOne({id:data.event})
        if(!existsEvent) return res.status(404).send({message:'Event not found'})
        //guardar los datos
        data.numberRes = cod;
        let newReservation = new reservationModel(data)
        await newReservation.save()
        //retornar los datos
        return res.send({message:'Reservation added successfully',newReservation})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error adding reservation'})
    }
}