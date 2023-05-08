'use strict'

const api = require('express').Router()
const { test } = require('./event.controller')

api.get('/test', test)

module.exports = api