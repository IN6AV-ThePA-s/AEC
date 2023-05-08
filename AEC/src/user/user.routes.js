'use strict'

const api = require('express').Router()
const { test, login } = require('./user.controller')

api.get('/test', test)

api.post('/login', login)

module.exports = api