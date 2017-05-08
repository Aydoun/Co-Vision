var invitationModel = require('../models/invitationModel');
var notifs = require('../constants/notificationMessages');
var {Formatter} = require('../lib');

exports.waitingInvitations = function(req, res, next) {
    if (!req.params.invitedId) res.status(200).send(Formatter(data , true));
    console.log('invited Id ' , req.params.invitedId);

    invitationModel.find({} , function(err , data){
      if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
    });
};
