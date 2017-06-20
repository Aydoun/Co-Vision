var express = require('express');
var visions = express.Router();
var visionModel = require('../models/visionModel');
var base = require('../controllers/baseCrudController')(visionModel);
var {
  createVision,
  contribute,
  historyList,
  historyTree,
  visionStatus,
  createBranch,
  readFile,
  checkoutBranch,
  branchList
} = require('../controllers/visionController');


//General Crud Routing
visions.get('/', base.get);
visions.get('/findOne', base.getOne);
visions.get('/count', base.count);
visions.get('/:id', base.getById);
visions.get('/:id/exists', base.exists);
visions.post('/', createVision);
visions.put('/:id', base.update);
visions.delete('/:id', base.remove);

visions.get('/:id/history', historyList);
visions.get('/:id/tree', historyTree);
visions.get('/:id/status', visionStatus);
visions.get('/:id/file', readFile);
visions.post('/:id/contribute', contribute);
visions.get('/:id/branch', branchList);
visions.post('/:id/branch', createBranch);
visions.put('/:id/branch', checkoutBranch);



module.exports = visions;
