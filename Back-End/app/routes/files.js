var express = require('express');
var files = express.Router();
const {
  addFile,
  removeFile,
  renameFile,
  addDirectory
} = require('../controllers/fileController');

files.post('/:id', addFile);
files.post('/:id/directory', addDirectory);
files.put('/:id', addFile);
files.put('/:id/rename', renameFile);
files.delete('/:id', removeFile);

module.exports = files;
