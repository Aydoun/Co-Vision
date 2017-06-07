var express = require('express');
var gits = express.Router();
var git = require('../controllers/gitController');

//General Crud Routing
gits.get('/history', git.history);
gits.post('/commit', git.commit);
gits.post('/repository', git.initRepository);
module.exports = gits;
