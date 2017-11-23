const formidable = require('formidable');
const fs = require('fs-extra');
const path = require('path');
const uuidv1 = require('uuid/v1');
const { defaultUploadPath, Formatter } = require('../lib');
const config = require('../config');
 
exports.uploadFile = function(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      const oldpath = files.file.path;
      const filename = files.file.name;
      const extension = filename.split('.').pop();
      const randomName = `${uuidv1()}.${extension}`;
      const newpath = path.join(defaultUploadPath(), randomName);

      fs.move(oldpath, newpath)
        .then(() => {
            res.status(200).send(Formatter(`${config.hostname}:${config.port}/media/${randomName}`));
        })
        .catch(err => {
            console.error(err)
        });
    });
};
