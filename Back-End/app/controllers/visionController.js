var visionModel = require('../models/visionModel');
var contributorModel = require('../models/contributorModel');
var _filter = require('lodash/filter');
var _findIndex = require('lodash/findIndex');
var {Formatter , concertToObjectId} = require('../lib');


exports.contributorList = function (req, res, next) {
  var visionId = req.params.id;

  contributorModel.find({'visions.visionId' : visionId} , 'fullName email avatar' , function(err , data){
      if (err) return res.status(200).send(Formatter(err , true));
      res.status(200).send(Formatter(data));
  });
};

exports.pathsList = function (req, res, next) {

  visionModel.findById(req.params.id, function (err, data) {
      if (err) return res.status(200).send(Formatter(err , true));

      var filtered = _filter(data.paths , ['status' , 'Open']);
      res.status(200).send(Formatter(filtered));
  });
};

exports.createPath = function (req, res, next) {
  var visionId = req.params.id;

  visionModel.findById(visionId, function (err, data) {
      if (err) return res.status(200).send(Formatter(err , true));

      data.paths.push(req.body);
      data.save(function(_err , _data){
          if (_err) return res.status(200).send(Formatter(_err , true));

          res.status(200).send({status:true , message:_data});
      });

  });
};

exports.updatePath = function (req, res, next) {
  var pathId = req.body._id;
  var id = convertToObjectId(req.body._id);
  var visionId = req.params.id;

  visionModel.findById(visionId, function (err, data) {
      if (err) return res.status(200).send(Formatter(err , true));
      var _index = _findIndex(data.paths , ['_id' , id]);

      if (_index >= 0) {
          Object.assign(data.paths[_index] , req.body);

          data.save(function(_err , _data){
              if (_err) return res.status(200).send(Formatter(_err , true));

              res.status(200).send({status:true , message:_data});
          });
      } else {
          return res.status(200).send(Formatter('Couldn\'t find the record' , true));
      }
  });
};
