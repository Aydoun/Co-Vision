var visionModel = require('../models/visionModel');
var magicNumbers = require('../constants/magicNumbers');
var {Formatter , ListFilter} = require('../lib');

exports.get = function (req, res , next){
    var reqQuery = req.query;
    var defaults = {
        page : 1,
        pageSize : magicNumbers.default_page_size,
        status : 'Active'
    }
    var query = Object.assign({} , defaults , reqQuery);

    visionModel.paginate(ListFilter(reqQuery), { page: query.page, limit: parseInt(query.pageSize) }, function(err, result) {
        if (err) return res.status(200).send(Formatter(err , true));
        res.status(200).send(Formatter({result}));
    });
}

exports.getById = function(req, res, next) {
  if (!req.params.id) res.status(200).send(Formatter(data , true));

	visionModel.findById(req.params.id, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
	});
};

exports.getOne = function(req, res, next) {
  var query = req.query;

	visionModel.find(query, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
	});
};

exports.create = function (req, res, next) {
	var newVision = new visionModel(req.body);

	newVision.save(function (err, data) {
		if (err) return res.status(200).send(Formatter(err , true));

		return res.status(200).send(Formatter(data));
	});

};

exports.update = function (req, res, next) {
	var id = req.params.id;

	visionModel.update({_id: id}, req.body, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(data));
	});
};

exports.remove = function (req, res, next) {
	var id = req.params.id;

  visionModel.update({_id: id}, {status : 'Inactive'}, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(data));
	});
};

exports.exists = function (req, res, next) {
	visionModel.findById(req.params.id , function (err , data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(data != null));
	});
};

exports.count = function (req, res, next) {
  var query = req.query;

	visionModel.count(query , function (err , count) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(count));
	});
};
