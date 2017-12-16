const {Formatter , ListFilter} = require('../lib');

module.exports = function (model){
  function get(req,res,next){
    const reqQuery = req.query;
    const defaults = {
        status : 'Active'
    }
    const query = Object.assign({} , defaults , reqQuery);

    model.find(query , (err , result) => {
        if (err) return res.status(403).send(Formatter(err , true));
        res.status(200).send(Formatter(result));
    });
  }

  function getById(req,res,next){
    const finalId = req.params.id || req.tokenData.iss;
    if (!finalId) {
      return res.status(403).send(Formatter({message:'All Fields Are Required'} , true));
    }

  	model.findById(finalId, function (err, data) {
    		if (err) return res.status(403).send(Formatter(err , true));

        res.status(200).send(Formatter(data));
  	});
  }

  function getOne(req,res,next){
    const query = req.query;

  	model.find(query, function (err, data) {
    		if (err) return res.status(403).send(Formatter(err , true));

        res.status(200).send(Formatter(data));
  	});
  }

  function create(req,res,next){
    req.body.creator = req.tokenData.iss;
    const newVision = new model(req.body);

  	newVision.save(function (err, data) {
  		if (err) return res.status(403).send(Formatter(err , true));

  		return res.status(200).send(Formatter(data._id));
  	});
  }

  function update(req,res,next){
    const id = req.params.id || req.tokenData.iss;

  	model.update({_id: id}, req.body, function (err, data) {
    		if (err) return res.status(403).send(Formatter(err, true));

    		res.status(200).send(Formatter(data));
  	});
  }

  function remove(req,res,next){
    const id = req.params.id || req.tokenData.iss;

    model.update({_id: id}, {status : 'Inactive'}, function (err, data) {
    		if (err) return res.status(403).send(Formatter(err , true));

    		res.status(200).send(Formatter(data));
  	});
  }

  function exists(req,res,next){
    const id = req.params.id || req.tokenData.iss;

    model.findById(id , function (err , data) {
        if (err) return res.status(403).send(Formatter(err , true));

        res.status(200).send(Formatter(data != null));
    });
  }

  function count(req,res,next){
    const query = req.query;

  	model.count(query , function (err , count) {
    		if (err) return res.status(403).send(Formatter(err , true));

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
