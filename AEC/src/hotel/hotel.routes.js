'use strict'

const api = require('express').Router();
const { ensureAdvance, isAdmin } = require('../services/authenticated');
const { test, add, gets, get, upd, del, uploadImgs, getImg } = require('./hotel.controller');
const connect_Multimary = require('connect-multiparty');
const upload = connect_Multimary({ uploadDir: './src/uploads/hotels' });

api.get('/test', test)
api.post('/save', add);

module.exports = api