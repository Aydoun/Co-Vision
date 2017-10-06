var express = require('express');
var contributors = express.Router();
var contributorModel = require('../models/userModel');
var base = require('../controllers/baseCrudController')(contributorModel);
var {visionList , addVisionToContributor } = require('../controllers/userController');

//General Crud Routing
contributors.get('/', base.get);
contributors.get('/findOne', base.getOne);
contributors.get('/count', base.count);
contributors.get('/:id', base.getById);
contributors.get('/:id/exists', base.exists);
contributors.post('/', base.create);
contributors.put('/:id', base.update);
contributors.delete('/:id', base.remove);

contributors.get('/:id/vision', visionList);
contributors.post('/:id/vision', addVisionToContributor);

module.exports = contributors;
