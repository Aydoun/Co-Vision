const fs = require('fs-extra');
const path = require('path');
const uuidv1 = require('uuid/v1');
const { defaultUploadPath, Formatter } = require('../lib');
const config = require('../config');

exports.uploadFile = function(req, res, next) {
    if (!req.files) {
      return res.status(200).send(Formatter({}, true, 'No files were uploaded.'));
    }
    let avatarFile = req.files.file;
    if (!avatarFile) {
      return res.status(200).send(Formatter({}, true, 'File name should be file'));
    }
    const filename = avatarFile.name;
    const extension = filename.split('.').pop();
    const newFileName = `${uuidv1()}.${extension}`;
    const fileUrl = `http://${config.hostname}:${config.port}/media/avatars/${newFileName}`;

    avatarFile.mv(path.join(__dirname, '../', `/media/avatars/${newFileName}`), function(err) {
    if (err)
      return res.status(500).send(err.message);

      req.fileUrl = fileUrl;
      next();
      // return res.status(200).send(Formatter(fileUrl));
    });
};
