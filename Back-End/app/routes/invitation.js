const invitations = require('express').Router();
const invitationModel = require('../models/invitationModel');
const base = require('../controllers/baseCrudController')(invitationModel);
const { waitingInvitations, answerRequest } = require('../controllers/invitationController');

invitations.get('/', waitingInvitations);
invitations.get('/findOne', base.getOne);
invitations.get('/count', base.count);
invitations.get('/:id', base.getById);
invitations.get('/:id/exists', base.exists);
invitations.post('/', base.create);
invitations.put('/answerRequest', answerRequest);
invitations.put('/:id', base.update);

module.exports = invitations;
