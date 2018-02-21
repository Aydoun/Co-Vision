const invitations = require('express').Router();
const { AllConversations, sendMessage } = require('../controllers/conversationController');

invitations.get('/', AllConversations);
invitations.post('/', sendMessage);

module.exports = invitations;
