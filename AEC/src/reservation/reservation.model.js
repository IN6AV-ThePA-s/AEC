'use strict'

const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    numberRes:{
        type:Number,
        unique: true 
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
        required:true
    },
    numberOfPeople:{
        type:Number,
        required:true   
    },
    numberOfNight:{
        type:Number,
        required:true 
    },
    additionalServices:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service'
    }],
    events:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    }],
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        uppercase:true,
        default:'PROGRESS',
        enum:['PROGRESS','COMPLETED','CANCELED'],
        required:true
    }
},{
    versionKey:false    
})

module.exports = mongoose.model('Reservation',reservationSchema)