var channelModel = require('../models/channelModel');
var notifs = require('../constants/notificationMessages');
var {Formatter} = require('../lib');

exports.comment = function (req, res, next) {
	var contributorId = req.body.contributorId;
	if (!contributorId) return res.status(200).send(Formatter(notifs.missing_required_parameters + ' , contributorId' , true));

	channelModel.findById(req.params.id , function(err , data){
			data.comments.push({
					comment : req.body.message,
					contributorId : req.body.contributorId
			});
			data.save(function(err , data){
					res.status(200).send(Formatter(data));
			});
	});
};
