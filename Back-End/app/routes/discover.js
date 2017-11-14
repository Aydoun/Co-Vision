const discovery = require('express').Router();
const { search, discover } = require('../controllers/discoverController');


discovery.get('/:userId', discover);
discovery.get('/:userId/search', search);

module.exports = discovery;
