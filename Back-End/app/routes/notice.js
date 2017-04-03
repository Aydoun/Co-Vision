var express = require('express');
var notices = express.Router();
var CT = require('../controllers/noticeController');

notices.get('/', CT.get);
notices.get('/:id', CT.getOne);
notices.post('/', CT.create);
notices.put('/:id', CT.update);
notices.delete('/:id', CT.remove);

module.exports = notices;
