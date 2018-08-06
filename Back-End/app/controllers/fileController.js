const path = require('path');
const visionModel = require('../models/visionModel');
const fse = require('fs-extra');
const promisify = require("promisify-node");
const pfs = promisify(require('fs'));
const uuidv1 = require('uuid/v1');
const { defaultUploadPath, defaultGitPath, Formatter } = require('../lib');
const config = require('../config');

exports.uploadFile = function(req, res, next) {
    const { avatarType } = req;
    const { files } = req;
    if (!files) {
      return res.status(200).send(Formatter('No files were uploaded.', true  ));
    }
    let avatarFile = files.file;
    if (!avatarFile) {
      return res.status(200).send(Formatter('File name should be avatar', true  ));
    }

    const filename = avatarFile.name;
    const extension = filename.split('.').pop();
    const newFileName = `${uuidv1()}.${extension}`;
    const fileUrl = `http://${config.hostname}:${config.mediaPort}/${avatarType}/${newFileName}`;

    avatarFile.mv(path.join(defaultUploadPath(), avatarType , newFileName), function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }

      req.fileUrl = fileUrl;
      next();
    });
};

exports.addFile = function(req, res, next) {
    const { id } = req.params;
    const { fileName, fileContent } = req.body;
    if (!fileName || !fileContent) {
      return res.status(403).send(Formatter('All Fields are Required', true));
    }

    visionModel.findById(id)
    .then(vision => {
      const gitPath = defaultGitPath(vision.systemId);
      const filePath = `${gitPath}/${fileName}`;
      fse.outputFileSync(filePath, fileContent);
    })
    .then(function(){
      return res.status(200).send(Formatter({}));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
};

exports.addDirectory = function(req, res, next) {
  const { id } = req.params;
  const { dirName } = req.body;
  if (!dirName) {
    return res.status(403).send(Formatter('All Fields are Required', true));
  }

  visionModel.findById(id)
  .then(vision => {
    const gitPath = defaultGitPath(vision.systemId);
    const filePath = `${gitPath}/${dirName}`;
    fse.ensureDirSync(filePath);
  })
  .then(function(){
    return res.status(200).send(Formatter({}));
  })
  .catch(err => {
    return res.status(403).send(Formatter(err.message , true));
  });
};

exports.renameFile = function(req, res, next) {
  const { id } = req.params;
  const { oldName, newName } = req.body;
  if (!oldName || !newName) {
    return res.status(403).send(Formatter('All Fields are Required', true));
  }

  visionModel.findById(id)
  .then(vision => {
    const gitPath = defaultGitPath(vision.systemId);
    const pathToFile = `${gitPath}/${oldName}`;
    const newPath = `${gitPath}/${newName}`;
    return pfs.rename(pathToFile, newPath);
  
  })
  .then(result => {
    return res.status(200).send(Formatter({}));
  })
  .then(function(){
    return res.status(200).send(Formatter({}));
  })
  .catch(err => {
    return res.status(403).send(Formatter(err.message , true));
  });
};

exports.removeFile = function(req, res, next) {
  const { id } = req.params;
  const { fileName } = req.body;
  if (!fileName) {
    return res.status(403).send(Formatter('All Fields are Required', true));
  }

  visionModel.findById(id)
  .then(vision => {
    const gitPath = defaultGitPath(vision.systemId);
    const filePath = `${gitPath}/${fileName}`;
    fse.removeSync(filePath);
  })
  .then(function(){
    return res.status(200).send(Formatter({}));
  })
  .catch(err => {
    return res.status(403).send(Formatter(err.message , true));
  });
};
