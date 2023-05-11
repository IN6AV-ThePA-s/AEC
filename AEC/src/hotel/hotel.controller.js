"use strict";

const Hotel = require("./hotel.model");
const Room = require('../room/room.model');
const { validateData } = require("../utils/validate");

/* ----- ADD HOTEL ----- */
exports.add = async(req, res) => {
    try {
        const data = req.body;
        let hotel = new Hotel(data);
        await hotel.save();
        return res.send({ message: `Hotel created sucessfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error adding hotel` });
    }
};

/* ----- GETs HOTELS ----- */
exports.gets = async(req, res) => {
    try {
        const hotels = await Hotel.find({}, { admin: 0 });
        return res.send({ hotels });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting hotels` });
    }
};

/* ----- GET HOTEL ----- */
exports.get = async(req, res) => {
    try {
        const hotelId = req.params.id;
        const hotel = await Hotel.findOne({ _id: hotelId });
        return res.send({ hotel });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting hotel` });
    }
};

/* ----- UPDATE HOTEL ----- */
exports.upd = async(req, res) => {
    try {
        const hotelId = req.params.id;
        const data = {
            name: req.body.name,
            address: req.bod.address,
            phone: req.body.phone,
            email: req.body.email,
        };
        let msg = validateData(data);
        if (msg) return res.status(418).send(msg);
        const hotel = await Hotel.updateOne({ _id: hotelId }, data);
        if (hotel.modifiedCount == 0)
            return res
                .status(400)
                .send({ message: `Hotel not found or not updated` });
        return res.send({ message: `The hotel has been updated` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error updatting hotel` });
    }
};

/* ----- DELETE HOTEL ----- */
exports.del = async(req, res) => {
    try {
        const hotelId = req.params.id;
        const dele = await Hotel.deleteOne({ _id: hotelId });
        await Room.deleteMany({ hotel: _id });
        if (dele.deletedCount == 0)
            return res
                .status(400)
                .send({ message: `Hotel not found or not deleted` });
        return res.send({ message: `The hotel has been deleted` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error deletting hotel` });
    }
};

exports.test = (req, res) => {
    res.send({ message: "Test hotels" });
};