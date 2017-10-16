var express = require('express');
var channels = express.Router();
var channelModel = require('../models/channelModel');
var base = require('../controllers/baseCrudController')(channelModel);
var {comment} = require('../controllers/channelController');

//General Crud Routing
channels.get('/', base.get);
channels.get('/count', base.count);
channels.get('/:id', base.getById);
channels.get('/:id/exists', base.exists);
channels.post('/', base.create);
channels.post('/:id/comment', comment);
channels.put('/:id', base.update);

module.exports = channels;
