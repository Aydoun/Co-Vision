var contributorModel = require('../models/contributorModel');
var parallel = require('async/parallel');
var {Formatter , nowDate} = require('../lib');

exports.get = function (req, res , next){
    var defaults = {
        page : 1,
        pageSize : 10
    }
    var query = Object.assign({} , defaults , req.query);
    contributorModel.paginate({}, { page: query.page, limit: parseInt(query.pageSize) }, function(err, result) {
        if (err) return res.status(200).send(Formatter(err , true));
        res.status(200).send(Formatter({result}));
    });
}

exports.getById = function(req, res, next) {
  if (!req.params.id) res.status(200).send(Formatter(data , true));

	contributorModel.findById(req.params.id, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
	});
};

exports.getOne = function(req, res, next) {
  var query = req.query;

	contributorModel.find(query, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
	});
};

exports.create = function (req, res, next) {
	var newContributor = new contributorModel(req.body);

	newContributor.save(function (err, data) {
		if (err) return res.status(200).send(Formatter(err , true));

		return res.status(200).send(Formatter(data));
	});

};

exports.update = function (req, res, next) {
	var id = req.params.id;

	contributorModel.update({_id: id}, req.body, function (err, data) {
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

exports.exists = function (req, res, next) {
	contributorModel.findById(req.params.id , function (err , data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(data != null));
	});
};

exports.count = function (req, res, next) {
  var query = req.query;

	contributorModel.count(query , function (err , count) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(count));
	});
};
