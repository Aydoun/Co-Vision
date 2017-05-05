var express = require('express');
var issues = express.Router();
var issueModel = require('../models/issueModel');
var base = require('../controllers/baseCrudController')(issueModel);
var {comment} = require('../controllers/issueController');

//General Crud Routing
issues.get('/', base.get);
issues.get('/count', base.count);
issues.get('/:id', base.getById);
issues.get('/:id/exists', base.exists);
issues.post('/', base.create);
issues.post('/:id/comment', comment);
issues.put('/:id', base.update);

module.exports = issues;
