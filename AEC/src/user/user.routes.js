'use strict'

const api = require('express').Router()
const { ensureAdvance } = require('../services/authenticated')
const { test, login, register, update, del, updatePassword } = require('./user.controller')

api.get('/test', test)

//PUBLIC ROUTES
api.post('/login', login)
api.post('/register', register)

//PRIVATE ROUTES
api.put('/update', ensureAdvance, update)
api.delete('/delete', ensureAdvance, del)
api.put('/updatePassword', ensureAdvance, updatePassword)

module.exports = api