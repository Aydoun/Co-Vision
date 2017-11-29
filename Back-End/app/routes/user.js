var express = require('express');
var users = express.Router();
var contributorModel = require('../models/userModel');
var base = require('../controllers/baseCrudController')(contributorModel);
var { visionList , addVisionToContributor } = require('../controllers/userController');

//General Crud Routing
users.get('/findOne', base.getOne);
users.get('/count', base.count);
users.get('/vision', visionList);
users.get('/', base.getById);
users.get('/exists', base.exists);
users.put('/', base.update);
users.post('/vision', addVisionToContributor);

module.exports = users;
