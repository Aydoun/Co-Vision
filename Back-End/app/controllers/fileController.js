const path = require('path');
const visionModel = require('../models/visionModel');
const fse = require('fs-extra');
const uuidv1 = require('uuid/v1');
const { defaultUploadPath, defaultGitPath, Formatter } = require('../lib');
const config = require('../config');

exports.uploadFile = function(req, res, next) {
    if (!req.files) {
      return res.status(200).send(Formatter('No files were uploaded.', true  ));
    }
    let avatarFile = req.files.file;
    if (!avatarFile) {
      return res.status(200).send(Formatter('File name should be avatar', true  ));
    }

    const filename = avatarFile.name;
    const extension = filename.split('.').pop();
    const newFileName = `${uuidv1()}.${extension}`;
    const fileUrl = `http://${config.hostname}:${config.port}/media/avatars/${newFileName}`;

    avatarFile.mv(path.join(__dirname, '../', `/media/avatars/${newFileName}`), function(err) {
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
      return fse.outputFileSync(filePath, fileContent);
      return 0;
    })
    .then(function(){
      return res.status(200).send(Formatter({}));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });

  // const gitPath = defaultGitPath(id);
  // const pathToRepo = `${gitPath}/${fileName}`;

  // pfse.outputFile(pathToRepo, fileContent)
  // .then(() => {
  //   return res.status(200).send(Formatter({}));
  // })
  // .catch(err => {
  //   return res.status(403).send(Formatter(err.message, true));
  // });
};

exports.addDirectory = function(req, res, next) {
  const { id } = req.params;
  const { fileName } = req.body;
  if (!fileName) {
    return res.status(403).send(Formatter('All Fields are Required', true));
  }

  const gitPath = defaultGitPath(id);
  const pathToRepo = `${gitPath}/${fileName}`;

  fse.ensureDir(pathToRepo)
  .then(() => {
    res.status(200).send(Formatter({
      file: pathToRepo
    }));
  })
  .catch(err => {
    res.status(403).send(Formatter(err.message, true));
  });
};

exports.renameFile = function(req, res, next) {
  const { id } = req.params;
  const { oldName, newName } = req.body;
  if (!oldName || !newName) {
    return res.status(403).send(Formatter('All Fields are Required', true));
  }

  const gitPath = defaultGitPath(id);
  const pathToFile = `${gitPath}/${oldName}`;
  const newPath = `${gitPath}/${newName}`;

  pfs.rename(pathToFile, newPath)
  .then(result => {
    res.status(200).send(Formatter({
      file: newPath
    }));
  })
  .catch(err => {
    res.status(403).send(Formatter(err.message, true));
  });
};

exports.removeFile = function(req, res, next) {
  const { id } = req.params;
  const { fileName } = req.body;

  if (!fileName) {
    return res.status(403).send(Formatter('All Fields are Required', true));
  }
  const gitPath = defaultGitPath(id);
  const pathToRepo = `${gitPath}/${fileName}`;

  pfse.remove(pathToRepo)
  .then(() => {
    res.status(200).send(Formatter({}));
  })
  .catch(err => {
    res.status(403).send(Formatter(err.message, true));
  });
};
