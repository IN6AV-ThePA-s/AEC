'use strict'
 
const api = require('express').Router()
const { test } = require('./room.controller')

api.get('/test', test)

module.exports = api