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
    const { conversationId, receiver, content } = req.body;
    const userId = req.userId;
    const cehckParams = conversationId ?  ['content'] : ['content', 'receiver'];
    const check = queryCheck(req.body , cehckParams);

    if (!(check)) {
      return res.status(403).send(Formatter({message:'Input Fields Incorrect'} , true));
    }

    if (conversationId) {
      conversationModel.findById(conversationId)
      .then(data => {
        data.messages.push({
          content,
          sender: req.userId
        });
        return data.save();
      })
      .then(savedData => {
        return res.status(200).send(Formatter(savedData));
      })
      .catch(err => {
        return res.status(403).send(Formatter(err , true));
      });
    } else {
      const query =
      {
        $or:
        [
          { $and:[ {'creator': userId}, {'receiver': receiver} ] },
          { $and:[ {'creator': receiver}, {'receiver': userId} ] }
        ]
      };
      conversationModel.find(query)
      .then(data => {
        if (data.length > 0) {
          // Having a onGoing Conversation
          data[0].messages.push({
            content,
            sender: req.userId
          });
          return data[0].save();
        } else {
          // First Conversation
          const input = {
              receiver: req.body.receiver,
              creator: req.userId,
              messages: [{
                content,
                sender: req.userId
              }]
          };
          const newConversation = new conversationModel(input);
          return newConversation.save();
        }
      })
      .then(results => {
        return res.status(200).send(Formatter(results));
      })
      .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
      });
    }
};
