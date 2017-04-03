var contributorModel = require('../models/contributorModel');
var {Formatter , nowDate} = require('../lib');


exports.get = function (req, res , next){
  var query = {};
  contributorModel.find({},
    function (err, data) {
      if (err) return res.status(200).send(Formatter(err , true));

      return res.status(200).send(Formatter(data));
    }
  );
}

exports.getOne = function(req, res, next) {
  if (!req.params.id) res.status(200).send(Formatter(data , true));

	contributorModel.findById(req.params.id, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
	});
};

exports.create = function (req, res, next) {
  var body = req.body;

  // Object.assign(body , {
  //
  //
  // })

	var newContributor = new contributorModel(req.body);

	newContributor.save(function (err, data) {
		if (err) return res.status(200).send(Formatter(err , true));

		return res.status(200).send(Formatter(data));
	});

};

exports.update = function (req, res, next) {
	var id = req.params.id;
	var doc = {
      title : req.body.title || ''
  };

	contributorModel.update({_id: id}, doc, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(data));
	});
};

exports.remove = function (req, res, next) {
	var id = req.params.id;

	contributorModel.findOne({_id: id}).remove(function (err , data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(data));
	});
};
