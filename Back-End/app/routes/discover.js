const discovery = require('express').Router();
const { search, discover } = require('../controllers/discoverController');


discovery.get('/', discover);
discovery.get('/search', search);

module.exports = discovery;
