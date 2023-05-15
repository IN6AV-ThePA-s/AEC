'use strict'

const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    photos: {
        type: [String]
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Hotel', hotelSchema);