const express = require('express');
const visions = express.Router();
const visionModel = require('../models/visionModel');
const base = require('../controllers/baseCrudController')(visionModel);
const {
  createVision,
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
  unRegister,
  addContribution,
  saveAvatar,
} = require('../controllers/visionController');
const { defaultUploadPath } = require('../lib');
const {
  addVisionToContributor,
} = require('../controllers/userController');
const { uploadFile } = require('../controllers/fileController');

//General Crud Routing
visions.get('/', base.get);
visions.get('/findOne', base.getOne);
visions.get('/count', base.count);
visions.get('/:id', base.getById);
visions.get('/:id/exists', base.exists);
visions.post('/', createVision, addVisionToContributor);
visions.post('/:id/upload', 
              (req, res, next) => { req.avatarType = 'visions'; next(); }, 
              uploadFile, saveAvatar);
visions.post('/:id/contribute', addContribution);
visions.put('/:id', base.update);
visions.delete('/:id', base.remove);

visions.get('/:id/log', historyList);
visions.get('/:id/tree', historyTree);
visions.get('/:id/summary', visionSummary);
visions.get('/:id/status', visionStatus);
visions.get('/:id/file', readFile);
visions.post('/:id/merge', mergeBranches);
visions.get('/:id/branch', branchList);
visions.post('/:id/branch', createBranch);
visions.put('/:id/branch', checkoutBranch);
visions.delete('/:id/branch', removeBranch);

visions.post('/:id/like', addLike);
visions.put('/:id/unregister', unRegister);

module.exports = visions;
