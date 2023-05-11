'use strict'

const api = require('express').Router()
const reservationController = require('./reservation.controller')

api.get('/test', reservationController.test)
api.post('/add',reservationController.addReservation)

module.exports = api