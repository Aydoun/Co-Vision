var express = require('express');
var invitations = express.Router();
var invitationModel = require('../models/invitationModel');
var base = require('../controllers/baseCrudController')(invitationModel);
var {waitingInvitations} = require('../controllers/invitationController');


//General Crud Routing
invitations.get('/', base.get);
invitations.get('/findOne', base.getOne);
invitations.get('/count', base.count);
invitations.get('/:id', base.getById);
invitations.get('/:id/exists', base.exists);
invitations.post('/', base.create);
invitations.put('/:id', base.update);

invitations.get('/:invitedId', waitingInvitations);

module.exports = invitations;
