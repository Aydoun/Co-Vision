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
  branchList,
  deleteBranch
} = require('../controllers/visionController');

var {
  addVisionToCreator,
} = require('../controllers/userController');


//General Crud Routing
visions.get('/', base.get);
visions.get('/findOne', base.getOne);
visions.get('/count', base.count);
visions.get('/:id', base.getById);
visions.get('/:id/exists', base.exists);
visions.post('/', createVision, addVisionToCreator);
visions.put('/:id', base.update);
visions.delete('/:id', base.remove);

visions.get('/:id/log', historyList);
visions.get('/:id/tree', historyTree);
visions.get('/:id/status', visionStatus);
visions.get('/:id/file', readFile);
visions.post('/:id/contribute', contribute);
visions.get('/:id/branch', branchList);
visions.post('/:id/branch', createBranch);
visions.put('/:id/branch', checkoutBranch);
visions.delete('/:id/branch', deleteBranch);

module.exports = visions;
