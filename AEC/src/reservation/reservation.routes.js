'use strict'

const api = require('express').Router()
const { ensureAdvance, isMaster, isAdmin } = require('../services/authenticated')
const reservationController = require('./reservation.controller')

api.get('/test', reservationController.test)
api.get('/history',[ensureAdvance],reservationController.historylUserLogged)
api.get('/resHotel/:id',[ensureAdvance,isMaster],reservationController.getReservPerHotel)
api.get('/get',[ensureAdvance,isMaster],reservationController.getReservations)
api.get('/hosted/:id',[ensureAdvance,isAdmin],reservationController.geteClientHotl)
api.get('/getUser/:id',[ensureAdvance],reservationController.getRservationsUser)
api.get('/getId/:id',[ensureAdvance],reservationController.getReservPerId)
api.post('/add', [ensureAdvance],reservationController.addReservation)
api.put('/cancel/:id',[ensureAdvance],reservationController.cancelReserv)
api.put('/update/:id',[ensureAdvance],reservationController.updateReserv)
api.put('/addEvent/:id/:idEvent',[ensureAdvance],reservationController.addEvent)
api.put('/remEvent/:id/:idEvent',[ensureAdvance],reservationController.removeEvent)
api.put('/addService/:id/:idService',[ensureAdvance],reservationController.addService)
api.put('/remService/:id/:idService',[ensureAdvance],reservationController.removeService)
api.put('/complete/:id',[ensureAdvance],reservationController.complete)


module.exports = api