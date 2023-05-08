'use strict'

const api = require('express').Router()
const { test } = require('./reservation.controller')

api.get('/test', test)

module.exports = api