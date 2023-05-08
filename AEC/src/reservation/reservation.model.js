'use strict'

const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    numberRes:{
        type:String,
        required:true
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:ture
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
        required:true
    },
    additionalServices:{
        type:[mongoose.Schema.Types,ObjectId],
        ref:'Service'
    },
    eventos:{
        type:mongoose.Schema.Types.ObjectId
    },
    total:{
        type:Number,
        required:ture
    },
    status:{
        type:String,
        uppercase:true,
        default:'PROGRESS',
        enum:['PROGRESS','COMPLETED'],
        required:true
    }
},{
    versionKey:false    
})

module.exports = mongoose.model('Reservation',reservationSchema)