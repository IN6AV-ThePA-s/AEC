'use strict'

const api = require('express').Router();
const { ensureAdvance, isAdmin, isMaster } = require('../services/authenticated')
const serviceController = require('./service.controller');

api.get('/test', [ensureAdvance. isAdmin], serviceController.test);
api.get('/get', [ensureAdvance], serviceController.getServices)
api.get('/get/:id', [ensureAdvance], serviceController.getService)
api.post('/add', [ensureAdvance, isMaster], serviceController.addService)
api.put('/update/:id', [ensureAdvance, isMaster], serviceController.updateService)
api.delete('delete/:id', [ensureAdvance, isMaster], serviceController.deleteService);

module.exports = api;
