var express = require('express');
var users = express.Router();
var contributorModel = require('../models/userModel');
var base = require('../controllers/baseCrudController')(contributorModel);
var {
  visionList,
  addVisionToContributor,
  saveAvatar,
  getUser
} = require('../controllers/userController');
const { uploadFile } = require('../controllers/fileController');

//General Crud Routing
users.get('/vision', visionList);
users.get('/', getUser);
users.get('/exists', base.exists);
users.put('/', base.update);
users.post('/vision', addVisionToContributor);
users.post('/upload', (req, res, next) => { req.avatarType = 'users'; next(); }, uploadFile, saveAvatar);

module.exports = users;
