'use strict'

const api = require('express').Router()
const { ensureAdvance, isMaster, isAdmin, authImg } = require('../services/authenticated')
const { test, login, register, update, del, updatePassword, save, updateUser, delUser, get, getUser, uploadImg, getImg } = require('./user.controller')
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({ uploadDir: './src/uploads/users/' })

api.get('/test', test)

//PUBLIC ROUTES
api.post('/login', login)
api.post('/register', register)
api.get('/getImg/:file', upload, getImg)
api.put('/registerImg/:id', [upload], uploadImg)

//PRIVATE ROUTES
api.put('/update', ensureAdvance, update)
api.delete('/delete', ensureAdvance, del)
api.put('/updatePassword', ensureAdvance, updatePassword)
api.put('/uploadImg/:id', [ensureAdvance, authImg, upload], uploadImg)

//ADMIN ROUTES
api.get('/get', [ensureAdvance, isAdmin], get)
api.get('/get/:id', [ensureAdvance], getUser)

//MASTER ROUTES
api.post('/save', [ensureAdvance, isMaster], save)
api.put('/update/:id', [ensureAdvance, isMaster], updateUser)
api.delete('/delete/:id', [ensureAdvance, isMaster], delUser)

module.exports = api