'use strict'

const api = require('express').Router()
const { test } = require('./service.controller')

api.get('/test', test)

module.exports = api