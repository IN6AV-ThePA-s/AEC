'use strict'

exports.test = (req, res) => {
    res.send({ message: 'Test hotels' })
}

const Hotel = require("./hotel.model");
const Room = require('../room/room.model');
const { validateData, isImg } = require("../utils/validate");
const fs = require('fs');
const path = require('path');

/* ----- ADD HOTEL ----- */
exports.add = async(req, res) => {
    try {
        const data = req.body;
        let hotel = new Hotel(data);
        await hotel.save();
        return res.send({ message: `Hotel created sucessfully`, HI: hotel._id });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error adding hotel`, error: err.message });
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

/* ----- UPLOAD IMGs ----- */
exports.uploadImgs = async(req, res) => {
    try {
        if (!req.files.images)
            return res.status(400).send({ message: 'Have not sent an images' });
        const imgs = req.files.images;
        let names = [];
        const hotelId = req.params.id;
        const url = './src/uploads/hotels/';
        const hotel = await Hotel.findOne({ _id: hotelId });
        if (hotel) {
            if (hotel.photos) {
                for (let photo of hotel.photos)
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
            await Hotel.updateOne({ _id: hotelId }, { photos: names });
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
            return res.status(404).send({ message: `Hotel not found` });
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
        const url = `./src/uploads/hotels/${file}`
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
    res.send({ message: "Test hotels" });
};