"use strict";

const Hotel = require("./hotel.model");
const Room = require('../room/room.model');
const User = require('../user/user.model');
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
        const { role, sub } = req.user;
        let hotels;
        if (role == 'ADMIN')
            hotels = await Hotel.find({ admin: sub }, { admin: 0 });
        else
            hotels = await Hotel.find({}).populate({
                path: 'admin',
                select: '_id name surname'
            });
        return res.send({ hotels });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting hotels` });
    }
};

exports.getOfHome = async(req, res) => {
    try {
        const hotels = await Hotel.find({}, { _id: 1, name: 1, address: 1, photos: 1 })
        return res.send({ hotels });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting hotels` });
    }
}

exports.getAdminsHotels = async(req, res) => {
    try {
        const { sub, role } = req.user;
        let admins;
        if (role == 'ADMIN')
            admins = await User.find({ _id: sub }, { _id: 1, name: 1, surname: 1 });
        else
            admins = await User.find({ role: 'ADMIN' }, { _id: 1, name: 1, surname: 1 });
        return res.send({ admins });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting admins` });
    }
}

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
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
        };
        let msg = validateData(data);
        if (msg) return res.status(418).send(msg);
        const hotel = await Hotel.findOneAndUpdate({ _id: hotelId }, data, {new: true});
        if (!hotel)
            return res
                .status(400)
                .send({ message: `Hotel not found or not updated` });
        return res.send({ message: `The hotel has been updated` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error updatting hotel`, error: err.message });
    }
};

/* ----- DELETE HOTEL ----- */
exports.del = async(req, res) => {
    try {
        const hotelId = req.params.id;
        const dele = await Hotel.deleteOne({ _id: hotelId });
        await Room.deleteMany({ hotel: hotelId });
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

exports.getHotelPerAdmin = async(req,res) =>{
    let userLoggued = req.user
    let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
    if(!existsHotel) return res.statu(404).send({message:'Hotel nof found'})
    return res.send({existsHotel})
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