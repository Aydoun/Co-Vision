const visionModel = require('../models/visionModel');
const UserModel = require('../models/userModel');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');

exports.search = function(req, res, next) {
    if (!req.query.q) {
        return res.status(403).send(Formatter({message:'All Fields Are Required'} , true));
    }
    const searchTerm = req.query.q;

    visionModel
    .find(
        { $text : { $search : searchTerm } },
        { score : { $meta: "textScore" } }
    )
    .sort({ score : { $meta : 'textScore' } })
    .exec(function(err, results) {
        if (err) return res.status(403).send(Formatter(err , true));

        res.status(200).send(Formatter(results));
    });
};

exports.discover = function(req, res, next) {
    const searchTerm = req.query.q || '';
    UserModel.findById(req.userId)
    .then(user => {
      return user.visions.map(item => item.visionId);
    })
    .then(userVisionsId => {
      return visionModel.find(
        { status:'Active', "_id": { "$nin": userVisionsId }
      }).lean()
    })
    .then(visions => {
      return res.status(200).send(Formatter(visions.map(vs => {
        const likesCount = vs.likes.length;
        delete vs['likes'];
        vs.likes = likesCount;
        return vs;
      })));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err, true));
    });
};
