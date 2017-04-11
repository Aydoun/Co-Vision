var express = require('express');
var contributors = express.Router();
var {get , getById , create , update , remove , exists , getOne , count , visionList , addVisionToContributor } = require('../controllers/contributorController');

//General Crud Routing
contributors.get('/', get);
contributors.get('/findOne', getOne);
contributors.get('/count', count);
contributors.get('/:id', getById);
contributors.get('/:id/exists', exists);
contributors.post('/', create);
contributors.put('/:id', update);
contributors.delete('/:id', remove);

contributors.get('/:id/vision', visionList);
contributors.post('/:id/vision', addVisionToContributor);

module.exports = contributors;
