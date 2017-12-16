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
  visionSummary,
  createBranch,
  readFile,
  checkoutBranch,
  mergeBranches,
  branchList,
  removeBranch,
  addLike,
  unRegister
} = require('../controllers/visionController');

var {
  addVisionToContributor,
} = require('../controllers/userController');


//General Crud Routing
visions.get('/', base.get);
visions.get('/findOne', base.getOne);
visions.get('/count', base.count);
visions.get('/:id', base.getById);
visions.get('/:id/exists', base.exists);
visions.post('/', createVision, addVisionToContributor);
visions.put('/:id', base.update);
visions.delete('/:id', base.remove);

visions.get('/:id/log', historyList);
visions.get('/:id/tree', historyTree);
visions.get('/:id/summary', visionSummary);
visions.get('/:id/status', visionStatus);
visions.get('/:id/file', readFile);
visions.post('/:id/contribute', contribute);
visions.post('/:id/merge', mergeBranches);
visions.get('/:id/branch', branchList);
visions.post('/:id/branch', createBranch);
visions.put('/:id/branch', checkoutBranch);
visions.delete('/:id/branch', removeBranch);

visions.post('/:id/like', addLike);
visions.put('/:id/unregister', unRegister);

module.exports = visions;
