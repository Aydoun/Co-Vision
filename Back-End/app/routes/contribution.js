var express = require('express');
var contributions = express.Router();
var contributionModel = require('../models/contributionModel');
var base = require('../controllers/baseCrudController')(contributionModel);

contributions.get('/', base.get);
contributions.get('/findOne', base.getOne);
contributions.get('/count', base.count);
contributions.get('/:id', base.getById);
contributions.get('/:id/exists', base.exists);
contributions.post('/', base.create);
contributions.put('/:id', base.update);
contributions.delete('/:id', base.remove);

module.exports = contributions;
