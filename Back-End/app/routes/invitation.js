const invitations = require('express').Router();
const invitationModel = require('../models/invitationModel');
const base = require('../controllers/baseCrudController')(invitationModel);
const { userWaitingInvitations, answerRequest, visionWaitingInvitations } = require('../controllers/invitationController');

invitations.get('/', userWaitingInvitations);
invitations.get('/vision', visionWaitingInvitations);
invitations.get('/findOne', base.getOne);
invitations.get('/count', base.count);
invitations.get('/:id', base.getById);
invitations.get('/:id/exists', base.exists);
invitations.post('/', base.create);
invitations.put('/answer', answerRequest);

module.exports = invitations;
