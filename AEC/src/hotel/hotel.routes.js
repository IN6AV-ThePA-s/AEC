'use strict'

const api = require('express').Router();
const { ensureAdvance, isAdmin } = require('../services/authenticated');
const { test, add, gets, get, upd, del, uploadImgs, getImg } = require('./hotel.controller');
const connect_Multimary = require('connect-multiparty');
const upload = connect_Multimary({ uploadDir: './src/uploads/hotels' });

/* ----- @admin ----- */
api.get('/test', [ensureAdvance, isAdmin], test);
api.post('/save', [ensureAdvance, isAdmin], add);
api.put('/update/:id', [ensureAdvance, isAdmin], upd);
api.delete('/delete/:id', [ensureAdvance, isAdmin], del);

/* ----- @global ----- */
api.get('/get', ensureAdvance, gets);
api.get('/get/:id', ensureAdvance, get);

/* --- testing --- */
api.put('/upload-imgs/:id', [ensureAdvance, isAdmin, upload], uploadImgs);
api.get('/get-img/:file', upload, getImg);

module.exports = api