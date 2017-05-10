var express = require('express');
var visions = express.Router();
var visionModel = require('../models/visionModel');
var base = require('../controllers/baseCrudController')(visionModel);
var {contributorList , pathsList , createPath , updatePath } = require('../controllers/visionController');


//General Crud Routing
visions.get('/', base.get);
visions.get('/findOne', base.getOne);
visions.get('/count', base.count);
visions.get('/:id', base.getById);
visions.get('/:id/exists', base.exists);
visions.post('/', base.create);
visions.put('/:id', base.update);
visions.delete('/:id', base.remove);

visions.get('/:id/contributor', contributorList);
visions.get('/:id/path', pathsList);
visions.post('/:id/path', createPath);
visions.put('/:id/path', updatePath);

module.exports = visions;
