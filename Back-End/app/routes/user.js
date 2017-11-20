var express = require('express');
var users = express.Router();
var contributorModel = require('../models/userModel');
var base = require('../controllers/baseCrudController')(contributorModel);
var { visionList , addVisionToContributor } = require('../controllers/userController');

//General Crud Routing
users.get('/findOne', base.getOne);
users.get('/count', base.count);
users.get('/:id', base.getById);
users.get('/:id/exists', base.exists);
users.put('/:id', base.update);
users.get('/:id/vision', visionList);
users.post('/:id/vision', addVisionToContributor);

module.exports = users;
