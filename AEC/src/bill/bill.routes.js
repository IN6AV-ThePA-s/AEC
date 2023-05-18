'use strict'

const api = require('express').Router()
const { ensureAdvance, isMaster, isAdmin } = require('../services/authenticated')
const { test, get} = require('./bill.controller')

api.get('/test', test)
api.get('/get',/*[ensureAdvance],*/get)

module.exports = api