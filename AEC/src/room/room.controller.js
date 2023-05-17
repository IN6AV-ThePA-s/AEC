"use strict";

const Room = require("./room.model");
const Hotel = require("../hotel/hotel.model");
const Reservation = require('../reservation/reservation.model');
const Service = require('../service/service.model');
const { validateData, isImg } = require("../utils/validate");
const fs = require('fs');
const path = require('path');

/* ----- ADD ----- */
exports.add = async(req, res) => {
    try {
        const data = req.body;
        let msg = validateData({ hotel: data.hotel, price: data.price });
        if (msg)
            return res.status(418).send(msg);
        if (!(await Hotel.findOne({ _id: data.hotel })))
            return res.status(418).send({ message: `Hotel not found` });
        const room = new Room(data);
        await room.save();
        return res.send({ message: `The room has been added`, RI: room._id });
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
        const rooms = await Room.find({ hotel: hotelId }).populate('services.service');
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
        if (!(await Reservation.find({ room: roomId })))
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

exports.addService = async(req, res) => {
    try {
        const roomId = req.params.id;
        const data = {
            service: req.body.service
        };
        const service = await Service.findOne({ _id: data.service });
        data.price = service.price;
        const addService = await Room.findOneAndUpdate({
            _id: roomId
        }, {
            $push: {
                services: data
            },
            $inc: {
                price: data.price
            }
        }, {
            new: true
        });
        if (!addService)
            return res.status(400).send({ message: `Room not found or service not found` })
        return res.send({ message: `Service added` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error adding service` });
    }
}

exports.delService = async(req, res) => {
    try {
        const roomId = req.params.id;
        const data = {
            service: req.body.service
        };
        const service = await Service.findOne({ _id: data.service });
        data.price = service.price;
        const addService = await Room.findOneAndUpdate({
            _id: roomId
        }, {
            $pull: {
                services: { service: service._id }
            },
            $inc: {
                price: Number(data.price * -1)
            }
        }, {
            new: true
        });
        if (!addService)
            return res.status(400).send({ message: `Room not found or service not found` })
        return res.send({ message: `Service deleted` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error adding service` });
    }
}

exports.getServiceByHotel = async(req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({ _id: roomId })
        const sers = await Service.find({ hotel: room.hotel });
        let services = [];
        for (const service of sers) {
            if (!(await Room.findOne({
                    $and: [
                        { _id: roomId },
                        { 'services.service': service._id }
                    ]
                }))) services.push(service);
        }
        return res.send({ services });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting services` })
    }
}

/* ----- UPLOAD IMGs ----- */
exports.uploadImgs = async(req, res) => {
    try {
        if (!req.files.images)
            return res.status(400).send({ message: 'Have not sent an images' });
        const imgs = req.files.images;
        let names = [];
        const roomId = req.params.id;
        const url = './src/uploads/hotels/';
        const room = await Room.findOne({ _id: roomId });
        if (room) {
            if (room.photos) {
                for (let photo of room.photos)
                    fs.unlinkSync(`${url}${photo}`);
            }
            let fP, fN, fE, fS, e;
            if (Array.isArray(imgs)) {
                for (let img of imgs) {
                    fP = img.path;
                    fS = fP.split('\\');
                    fN = fS[3];
                    e = fN.split('\.');
                    fE = e[3];
                    if (isImg(e))
                        fs.unlinkSync(fP);
                    names.push(fN);
                }
            } else {
                fP = imgs.path;
                fS = fP.split('\\');
                fN = fS[3];
                e = fN.split('\.');
                fE = e[3];
                if (isImg(e))
                    fs.unlinkSync(fP);
                names.push(fN);
            }
            await Room.updateOne({ _id: roomId }, { photos: names });
            return res.send({ message: `Photos added successfully` });
        } else {
            if (Array.isArray(imgs)) {
                for (let img of imgs) {
                    const fp = img.path;
                    fs.unlinkSync(fp);
                }
            } else {
                const fp = imgs.path;
                fs.unlinkSync(fp);
            }
            return res.status(404).send({ message: `Room not found` });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error uploading imgs` });
    }
}

/* ----- GET PHOTO ----- */
exports.getImg = async(req, res) => {
    try {
        const { file } = req.params;
        const url = `./src/uploads/rooms/${file}`
        const img = fs.existsSync(url)
        if (!img)
            return res.status(404).send({ message: 'Image not found' });
        return res.sendFile(path.resolve(url));
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting img', error: err })
    }
}

exports.test = (req, res) => {
    res.send({ message: "Test rooms" });
};