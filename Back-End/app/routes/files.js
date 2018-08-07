var express = require('express');
var files = express.Router();
const {
  addFile,
  removeFile,
  renameFile,
  addDirectory
} = require('../controllers/fileController');
const {
  checkoutBranch,
} = require('../controllers/gitController');
const { Formatter } = require('../lib');

// Branch Checkout on every Operation
files.use((req, res, next) => {
  const { systemId, branchName } = req;
  if (systemId && branchName) {
    checkoutBranch(systemId, branchName)
    .then(() => {
      console.log('Calling Middleware.....');
      next();
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
  }
});

files.post('/:id', addFile);
files.post('/:id/directory', addDirectory);
files.put('/:id', addFile);
files.put('/:id/rename', renameFile);
files.delete('/:id', removeFile);

module.exports = files;
