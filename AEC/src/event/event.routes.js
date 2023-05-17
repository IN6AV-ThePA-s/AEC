'use strict'

const api = require('express').Router()
const eventController = require('./event.controller')
const { ensureAdvance, isAdmin, isMaster } = require('../services/authenticated')

api.get('/test', eventController.test)
api.post('/add',[ensureAdvance,isAdmin, isMaster], eventController.addEvent)
api.get('/get', ensureAdvance, eventController.getEvents)
api.get('/getByHotel/:id', ensureAdvance, eventController.getEventsByHotel)
api.get('/getOne/:id',[ensureAdvance,isAdmin, isMaster], eventController.getEvent)
api.delete('/delete/:id',[ensureAdvance,isAdmin, isMaster],  eventController.deleteEvent)
api.put('/update/:id',[ensureAdvance,isAdmin, isMaster],  eventController.updateEvent)

module.exports = api