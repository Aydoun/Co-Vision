var noticeModel = require('../models/noticeModel');

var get = function (req, res, next) {
  var query = {};
  noticeModel.find({},
		function (err, data) {
			if (err) return res.status(200).send({error:true , message : err});

			return res.status(200).send(data);
		});
};

var getOne = function (req, res, next) {
  var params = {
    companyId : req.params.id
  }

	noticeModel.findOne(params, function (err, data) {
		if (err) res.status(200).send({'error' : 'No Data Bro'});

    if( data !== null ){
      res.status(200).send({data : data});
    }else{
      res.status(200).send({error : true , data : data, message : 'Bro That shit is awesome'});
    }
	});
};

var create = function (req, res, next) {
	var newNotice = new noticeModel(req.body);

	newNotice.save(function (err, data) {
		if (err) return res.status(200).send({error:true , message:err});

		return res.status(200).send({'data': data , error:false, status : true});
	});

};

var update = function (req, res, next) {
	var id = req.params.id;
	var doc = {
      title : req.body.title || ''
  };

	noticeModel.update({_id: id}, doc, function (err) {
  		if (err) return res.status(200).send({error:true , message:err});

  		res.status(200).send({error:false , isbn : id , message:'Update Success'});
	});
};

var remove = function (req, res, next) {
	var id = req.params.id;

	noticeModel.findOne({_id: id}).remove(function (err) {
  		if (err) return res.status(200).send({error:true , message:err});

  		res.status(200).send({status:true , _id : id , message:'Delete Success'});
	});
};

module.exports = {get , getOne , create , update , remove};
