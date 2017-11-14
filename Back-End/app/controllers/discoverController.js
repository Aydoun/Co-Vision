const visionModel = require('../models/visionModel');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');

exports.search = function(req, res, next) {
    if (!(isValidObjectId(req.params.userId) && req.query.q)) {
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
    visionModel
    .find(
        {}
    )
    .limit(10)
    .sort({ updatedAt: -1 })
    .exec(function(err, results) {
        if (err) return res.status(200).send(Formatter(err , true));

        res.status(200).send(Formatter(results));
    });
};
