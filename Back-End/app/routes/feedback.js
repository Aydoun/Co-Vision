var express = require('express');
var feedbacks = express.Router();
var feedbackModel = require('../models/feedbackModel');
var base = require('../controllers/baseCrudController')(feedbackModel);

//General Crud Routing
feedbacks.post('/', base.create);

module.exports = feedbacks;
