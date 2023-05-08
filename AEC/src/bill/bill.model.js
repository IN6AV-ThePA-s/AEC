'use strict'

const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    numberBill:{
        type:number,
        required:true
    },
    reservation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reservation',
        required:true
    }
},{
    versionKey:true
})

module.exports = mongoose.model('Bill',billSchema)