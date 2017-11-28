const conversationModel = require('../models/conversationModel');
const userModel = require('../models/userModel');
const uniq = require('lodash/uniq');
const groupBy = require('lodash/groupBy');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');

exports.AllConversations = function(req, res, next) {
    const userId = req.userId;
    const query = { $or:[ {'creator': userId}, {'receiver': userId} ]};
    let ConversationData = null;

    conversationModel.find(query)
    .then(data => {
      ConversationData = data;
      let UserIds = [];
      data.forEach(dt => {
        UserIds.push(dt.creator.toString());
        UserIds.push(dt.receiver.toString());
      });
      return userModel.find( { _id : { $in : uniq(UserIds) } }, '_id avatar fullName')
    })
    .then(userAvatars => {
      return res.status(200).send(
        Formatter(
          {
            conversations: ConversationData,
            userMeta: groupBy(userAvatars, '_id')
          }
        )
      );
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message, true));
    });
};

exports.sendMessage = function(req, res, next) {
    const { creator, conversationId, receiver, content } = req.body;
    const cehckParams = conversationId ?  ['content'] : ['content', 'receiver'];
    const check = queryCheck(req.body , cehckParams)

    if (!(check)) {
      return res.status(403).send(Formatter({message:'Input Fields Incorrect'} , true));
    }

    if (conversationId) {
      conversationModel.findById(conversationId , function(err , data){
        if (err) return res.status(200).send(Formatter(err , true));

        data.messages.push({
          content,
          sender: req.userId
        });
        data.save(function(err , _data){
          return res.status(200).send(Formatter(_data));
        });
      });
    } else {
      // Create New Conversation
      const input = {
          receiver: req.body.receiver,
          creator: req.userId,
          messages: [{
            content,
            sender: req.userId
          }]
      };
      const newConversation = new conversationModel(input);
      newConversation.save()
      .then(data => {
        return res.status(200).send(Formatter(data));
      })
      .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
      });
    }
};
