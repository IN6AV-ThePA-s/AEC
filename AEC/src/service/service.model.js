'use strict'

const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    service:{
        type: String,
        required: true,
        uppercase: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Service', serviceSchema);