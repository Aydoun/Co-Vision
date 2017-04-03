var express = require('express');
var contributors = express.Router();
var {get , getOne , create , update , remove } = require('../controllers/contributorController');

//General Crud Routing
contributors.get('/', get);
contributors.get('/:id', getOne);
contributors.post('/', create);
contributors.put('/:id', update);
contributors.delete('/:id', remove);

module.exports = contributors;
