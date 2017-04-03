var contributorModel = require('../models/contributorModel');
var {Formatter} = require('../lib');


exports.get = function (req, res , next){
  var query = {};
  postModel.find({},
    function (err, data) {
      if (err) return res.status(200).send({error:true , message : err});

      return res.status(200).send(Formatter(data));
    }
  );
}

exports.getOne = function(req, res, next) {
  if (!req.params.id) res.status(200).send(Formatter(data , true));

	postModel.findById(req.params.id, function (err, data) {
  		if (err) res.status(200).send({error : true , message : err});

      res.status(200).send({error : false , data : data});
	});
};

exports.create = function (req, res, next) {
	var newPost = new postModel(req.body);

	newPost.save(function (err, data) {
		if (err) return res.status(200).send({error:true , message:err});

		return res.status(200).send({data: data, error:false});
	});

};

exports.update = function (req, res, next) {
	var id = req.params.id;
	var doc = {
      title : req.body.title || ''
  };

	postModel.update({_id: id}, doc, function (err) {
  		if (err) return res.status(200).send({error:true , message:err});

  		res.status(200).send({error:false , message : 'success'});
	});
};

exports.remove = function (req, res, next) {
	var id = req.params.id;

	postModel.findOne({_id: id}).remove(function (err) {
  		if (err) return res.status(200).send({error:true , message:err});

  		res.status(200).send({status:true , message:'Delete Success'});
	});
};
