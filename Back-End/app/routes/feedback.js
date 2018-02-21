const feedbacks = require('express').Router();
const feedbackModel = require('../models/feedbackModel');
const base = require('../controllers/baseCrudController')(feedbackModel);

feedbacks.post('/', base.create);

module.exports = feedbacks;
