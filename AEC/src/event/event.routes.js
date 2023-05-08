'use strict'

const api = require('express').Router()
const eventController = require('./event.controller')

api.get('/test', eventController.test)
api.post('/add', eventController.addEvent)
api.get('/get', eventController.getEvents)
api.get('/getOne/:id', eventController.getEvent)
api.delete('/delete/:id', eventController.deleteEvent)
api.put('/update/:id', eventController.updateEvent)

module.exports = api