var contributorModel = require('../models/contributorModel');
var visionModel = require('../models/visionModel');
var notifs = require('../constants/notificationMessages');
var magicNumbers = require('../constants/magicNumbers');
var {Formatter} = require('../lib');

exports.get = function (req, res , next){
    var reqQuery = req.query;
    var defaults = {
        page : 1,
        pageSize : magicNumbers.default_page_size,
        status : 'Active'
    }
    var query = Object.assign({} , defaults , req.query);
    delete reqQuery['page'];
    delete reqQuery['pageSize'];
    var filterParams =  reqQuery;

    contributorModel.paginate(filterParams, { page: query.page, limit: parseInt(query.pageSize) }, function(err, result) {
        if (err) return res.status(200).send(Formatter(err , true));
        res.status(200).send(Formatter({result}));
    });
}

exports.getById = function(req, res, next) {
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
  var body = req.body;

  if (body.vision_id != null) {
      //Vision Update
  }

	contributorModel.update({_id: id}, req.body, function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		res.status(200).send(Formatter(data));
	});
};

exports.remove = function (req, res, next) {
	var id = req.params.id;

  contributorModel.update({_id: id}, {status : 'Inactive'}, function (err, data) {
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

exports.visionList = function(req, res, next) {
    if (!req.params.id) res.status(200).send(Formatter(data , true));
    var contributor = contributorModel.findById(req.params.id , function(err , data){
      console.log(data.visions);
      visionModel.find({}).
      where('_id').
      in(data.visions.map((item)=>item.visionId)).
      exec(function(err , data){
          if (err) return res.status(200).send(Formatter(err , true));

          res.status(200).send(Formatter(data));
      });
    });

};

exports.addVisionToContributor = function(req, res, next) {
    var visionId = req.body.visionId;
    if (!visionId) return res.status(200).send(Formatter(notifs.missing_required_parameters + ' , visionId' , true));

    contributorModel.findById(req.params.id , function(err , data){
        data.visions.push({
            visionId : visionId
        });
        data.save(function(err , data){
            res.status(200).send(Formatter(data));
        });
    });
};
