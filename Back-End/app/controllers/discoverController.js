const visionModel = require('../models/visionModel');
const UserModel = require('../models/userModel');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');

exports.search = function(req, res, next) {
    if (!req.query.q) {
        return res.status(200).send(Formatter({message:'All Fields Are Required'} , true));
    }
    const searchTerm = req.query.q;

    visionModel
    .find(
        { $text : { $search : searchTerm } },
        { score : { $meta: "textScore" } }
    )
    .sort({ score : { $meta : 'textScore' } })
    .exec(function(err, results) {
        if (err) return res.status(200).send(Formatter(err , true));

        res.status(200).send(Formatter(results));
    });
};

exports.discover = function(req, res, next) {
    UserModel.findById(req.userId , function(err , user){
      if (err) {
        return res.status(200).send(Formatter(err , true));
      }
      const userVisionsId = user.visions.map(item => item.visionId);
      
      visionModel.find({ status:'Active', "_id": { "$nin": userVisionsId } })
      .then((results) => {
        res.status(200).send(Formatter(results));
      })
      .catch((err) => {
        res.status(200).send(Formatter(err, true));
      });
    });
};
