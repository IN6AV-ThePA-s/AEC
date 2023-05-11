'use strict'

const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    cod: {
        type: String,
        required: true,
        uppercase: true
    },
    status: {
        type: String,
        required: true,
        default: 'AVAILABLE',
        enum: ['AVAILABLE', 'BUSY']
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    beds: {
        type: {
            name: {
                type: String,
                required: true
            },
            cant: {
                type: String,
                required: true
            },
            capacity: {
                type: String,
                required: true
            }
        },
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Room', roomSchema);