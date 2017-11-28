const invitations = require('express').Router();
const { AllConversations, sendMessage } = require('../controllers/conversationController');

invitations.get('/', AllConversations);
// invitations.get('/findOne', base.getOne);
// invitations.get('/count', base.count);
// invitations.get('/:id', base.getById);
// invitations.get('/:id/exists', base.exists);
invitations.post('/', sendMessage);
// invitations.put('/answerRequest', answerRequest);
// invitations.put('/:id', base.update);

module.exports = invitations;
