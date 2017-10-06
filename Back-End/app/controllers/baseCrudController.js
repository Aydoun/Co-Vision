var { Formatter } = require('../lib');
var magicNumbers = require('../constants/magicNumbers');

module.exports = function (model){
  function get(req,res,next){
    var reqQuery = req.query;
    var defaults = {
        page : 1,
        pageSize : magicNumbers.default_page_size,
        status : 'Active'
    }
    var query = Object.assign({} , defaults , reqQuery);

    model.find(reqQuery, function(err, result) {
        if (err) return res.status(200).send(Formatter(err , true));
        res.status(200).send(Formatter({result}));
    });
  }

  function getById(req,res,next){
    if (!req.params.id) res.status(200).send(Formatter(data , true));

  	model.findById(req.params.id, function (err, data) {
    		if (err) return res.status(200).send(Formatter(err , true));

        res.status(200).send(Formatter(data));
  	});
  }

  function getOne(req,res,next){
    var query = req.query;

  	model.find(query, function (err, data) {
    		if (err) return res.status(200).send(Formatter(err , true));

        res.status(200).send(Formatter(data));
  	});
  }

  function create(req,res,next){
    var newVision = new model(req.body);

  	newVision.save(function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		return res.status(200).send(Formatter(data));
  	});
  }

  function update(req,res,next){
    var id = req.params.id;

  	model.update({_id: id}, req.body, function (err, data) {
    		if (err) return res.status(200).send(Formatter(err , true));

    		res.status(200).send(Formatter(data));
  	});
  }

  function remove(req,res,next){
    var id = req.params.id;

    model.update({_id: id}, {status : 'Inactive'}, function (err, data) {
    		if (err) return res.status(200).send(Formatter(err , true));

    		res.status(200).send(Formatter(data));
  	});
  }

  function exists(req,res,next){
    model.findById(req.params.id , function (err , data) {
        if (err) return res.status(200).send(Formatter(err , true));

        res.status(200).send(Formatter(data != null));
    });
  }

  function count(req,res,next){
    var query = req.query;

  	model.count(query , function (err , count) {
    		if (err) return res.status(200).send(Formatter(err , true));

    		res.status(200).send(Formatter(count));
  	});
  }

  return {
      get : get,
      getOne : getOne,
      getById : getById,
      create : create,
      update : update,
      remove : remove,
      exists : exists,
      count : count
  };
}
