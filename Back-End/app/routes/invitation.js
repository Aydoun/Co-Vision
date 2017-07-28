const express = require('express');
const invitations = express.Router();
const invitationModel = require('../models/invitationModel');
const base = require('../controllers/baseCrudController')(invitationModel);
const { waitingInvitations } = require('../controllers/invitationController');

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
