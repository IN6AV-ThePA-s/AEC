'use strict'

const mongoose = require('mongoose');

/*
    -Nombre evento
    -Tipo de evento
    -Cantidad maxima de personas
    -Precio
*/

const eventSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['Social', 'Cultural', 'Deportivo', 'Empresarial', 'Académico', 'Religioso']
    },
    maxPersons:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
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

module.exports = mongoose.model('Event', eventSchema)