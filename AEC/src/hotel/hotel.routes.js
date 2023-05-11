'use strict'

const api = require('express').Router();
const { ensureAdvance, isAdmin } = require('../services/authenticated');
const { test, add, gets, get, upd, del } = require('./hotel.controller');

/* ----- @admin ----- */
api.get('/test', [ensureAdvance, isAdmin], test);
api.post('/save', [ensureAdvance, isAdmin], add);
api.put('/update/:id', [ensureAdvance, isAdmin], upd);
api.delete('/delete/:id', [ensureAdvance, isAdmin], del);

/* ----- @global ----- */
api.get('/get', ensureAdvance, gets);
api.get('/get/:id', ensureAdvance, get);

module.exports = api