var express = require('express');
var visions = express.Router();
var {get , getById , create , update , remove , exists , getOne , count , contributorList } = require('../controllers/visionController');

//General Crud Routing
visions.get('/', get);
visions.get('/findOne', getOne);
visions.get('/count', count);
visions.get('/:id', getById);
visions.get('/:id/exists', exists);
visions.post('/', create);
visions.put('/:id', update);
visions.delete('/:id', remove);

visions.get('/:id/contributor', contributorList);

module.exports = visions;
