"use strict";

const Room = require("./room.model");
const Hotel = require("../hotel/hotel.model");
const Reservation = require('../reservation/reservation.model');
const { validateData } = require("../utils/validate");

/* ----- ADD ----- */
exports.add = async(req, res) => {
    try {
        const data = req.body;
        let msg = validateData({ hotel: data.hotel });
        if (msg)
            return res.status(418).send(msg);
        if (!(await Hotel.findOne({ _id: data.hotel })))
            return res.status(418).send({ message: `Hotel not found` });
        const room = new Room(data);
        await room.save();
        return res.send({ message: `The room has been added` })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error adding room`, error: err.message });
    }
}

/* ----- GETs ----- */
exports.gets = async(req, res) => {
    try {
        const rooms = await Room.find()
            .populate({
                path: 'hotel'
            });
        return res.send({ rooms });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting rooms` });
    }
}

exports.getByHotel = async(req, res) => {
    try {
        const hotelId = req.params.id;
        const rooms = await Room.find({ hotel: hotelId });
        return res.send({ rooms });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting rooms by hotel` });
    }
}

exports.get = async(req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({ _id: roomId })
            .populate({
                path: 'hotel'
            });
        return res.send({ room });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting room` });
    }
}

/* ----- DELETE ----- */
exports.del = async(req, res) => {
    try {
        const roomId = req.params.id;
        if (await Reservation.find({ room: roomId }))
            return res.status(401).send({ message: `The room cannot be deleted as it has a reservation` });
        const delR = await Room.deleteOne({ _id: roomId });
        if (delR.deletedCount == 0)
            return res.status(401).send({ message: `Room not found or not deleted` });
        return res.send({ message: `The room has been deleted successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error deletting room` });
    }
}

/* ----- UPDATE ----- */
exports.upda = async(req, res) => {
    try {
        const roomId = req.params.id;
        const data = req.body;
        let msg = validateData({ hotel: data.hotel });
        if (msg)
            return res.status(418).send(msg);
        if (!(await Hotel.findOne({ _id: data.hotel })))
            return res.status(418).send({ message: `Hotel not found` });
        const upH = await Room.updateOne({ _id: roomId }, data);
        if (upH.modifiedCount == 0)
            return res.status(401).send({ message: `Room not found or not updated` });
        return res.send({ message: `The room has been updated successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error updating room` });
    }
}

exports.test = (req, res) => {
    res.send({ message: "Test rooms" });
};