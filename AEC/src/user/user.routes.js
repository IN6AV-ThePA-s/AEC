'use strict'

const api = require('express').Router()
const { test } = require('./user.controller')

api.get('/test', test)

module.exports = api