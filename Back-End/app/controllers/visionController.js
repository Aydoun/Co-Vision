var visionModel = require('../models/visionModel');
var contributorModel = require('../models/contributorModel');
var {Formatter} = require('../lib');


exports.contributorList = function (req, res, next) {
  var visionId = req.params.id;

  contributorModel.find({'visions.visionId' : visionId} , 'fullName email avatar' , function(err , data){
      if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
  });
};
