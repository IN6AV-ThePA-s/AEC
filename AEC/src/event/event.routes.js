'use strict'

const api = require('express').Router()
const eventController = require('./event.controller')

api.get('/test', eventController.test)
api.post('/add', eventController.addEvent)

module.exports = api