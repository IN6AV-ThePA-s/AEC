'use strict'

const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    numberBill:{
        type:Number,
        required:true
    },
    reservation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reservation',
        required:true
    }
},{
    versionKey:false    
})

module.exports = mongoose.model('Bill',billSchema)