'use strict'

const api = require('express').Router()
const { ensureAdvance, isMaster, isAdmin } = require('../services/authenticated')
const { test, get,getAll} = require('./bill.controller')

api.get('/test', test)
api.get('/get/:id',[ensureAdvance],get)
api.get('/getAll',[ensureAdvance,isMaster],getAll)

module.exports = api