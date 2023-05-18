'use strict'

const api = require('express').Router();
const { ensureAdvance, isAdmin } = require('../services/authenticated');
const { test, add, getsAvailable, gets, getByHotel, get, upda, del, uploadImgs, getImg, addService, delService, getServiceByHotel } = require('./room.controller');
const connect_Multimary = require('connect-multiparty');
const upload = connect_Multimary({ uploadDir: './src/uploads/rooms' });

/* ----- @admin ----- */
api.get('/test', [ensureAdvance, isAdmin], test);
api.post('/add', [ensureAdvance, isAdmin], add);
api.put('/update/:id', [ensureAdvance, isAdmin], upda);
api.delete('/delete/:id', [ensureAdvance, isAdmin], del);
api.put('/add-service/:id', [ensureAdvance, isAdmin], addService);
api.put('/delete-service/:id', [ensureAdvance, isAdmin], delService);
api.get('/get-services-room/:id', [ensureAdvance, isAdmin], getServiceByHotel);

/* ----- @global ----- */
api.get('/get', ensureAdvance, gets);
api.get('/getA', ensureAdvance, getsAvailable);
api.get('/get-by-hotel/:id', ensureAdvance, getByHotel);
api.get('/get/:id', ensureAdvance, get);

/* --- testing --- */
api.put('/upload-imgs/:id', [ensureAdvance, isAdmin, upload], uploadImgs);
api.get('/get-img/:file', upload, getImg);

module.exports = api;