'use strict'

const api = require('express').Router()
const { test } = require('./bill.controller')

api.get('/test', test)

module.exports = api