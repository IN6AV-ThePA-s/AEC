'use strict'

const api = require('express').Router()
const { test } = require('./hotel.controller')

api.get('/test', test)

module.exports = api