var express = require('express');
var users = express.Router();
var userModel = require('../models/userModel');
var base = require('../controllers/baseCrudController')(userModel);
var { visionList , addVisionToCreator , LogIn, Register } = require('../controllers/userController');

//General Crud Routing
users.get('/', base.get);
users.get('/findOne', base.getOne);
users.get('/count', base.count);
users.get('/:id', base.getById);
users.get('/:id/exists', base.exists);
users.put('/:id', base.update);
users.delete('/:id', base.remove);

users.get('/:id/vision', visionList);
users.post('/:id/vision', addVisionToCreator);
users.post('/login', LogIn);
users.post('/register', Register);

module.exports = users;
