'use strict'

const api = require('express').Router();
const { ensureAdvance, isAdmin, isMaster } = require('../services/authenticated')
const serviceController = require('./service.controller');

api.get('/test', [ensureAdvance, isAdmin], serviceController.test);
api.get('/get', [ensureAdvance], serviceController.getServices)
api.get('/get/:id', [ensureAdvance], serviceController.getService)
api.get('/get-hotel-service/:hotel', [ensureAdvance], serviceController.getServicesByHotel)
api.post('/add', [ensureAdvance, isAdmin], serviceController.addService)
api.put('/update/:id', [ensureAdvance, isAdmin], serviceController.updateService)
api.delete('/delete/:id', [ensureAdvance, isAdmin], serviceController.deleteService);

module.exports = api;
