const conversationModel = require('../models/conversationModel');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');
 
exports.AllConversations = function(req, res, next) {
    const { userId } = req.params;

    if(!userId) {
        res.status(200).send(Formatter({message:'All Fields Are Required'} , true));
        return;
    }

    const query = { $or:[ {'creator': userId}, {'receiver': userId} ]}

    conversationModel.find(query , function(err , data){
      if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
    });
};

exports.sendMessage = function(req, res, next) {
    const { creator, conversationId, receiver, content } = req.body;
    const cehckParams = !conversationId ? ['content', 'userId', 'receiver'] : ['content', 'userId'];
    const check = queryCheck(req.body , cehckParams)

    if (!(check && isValidObjectId(req.body.userId) && isValidObjectId(req.body.receiver))) {
        res.status(200).send(Formatter({message:'Input Fields Incorrect'} , true));
        return;
    }

    if (!conversationId) {
      // Create New Conversation
      const input = {
          receiver: req.body.receiver,
          creator: req.body.userId,
          messages: [{
            content
          }]
      }
      const newConversation = new conversationModel(input);

  	  newConversation.save(function (err, data) {
  		if (err) return res.status(200).send(Formatter(err , true));

  		return res.status(200).send(Formatter(data));
  	  });
    } else {
      conversationModel.findById(conversationId , function(err , data){
        if (err) return res.status(200).send(Formatter(err , true));
        if (data === null) {
            return res.status(200).send(Formatter('Cannot Find The Conversation' , true))
        }

        data.messages.push({
            content,
            action: req.body.userId == data.creator ? 'sent': 'received'
        });
        data.save(function(err , _data){
            res.status(200).send(Formatter(_data));
        });
      });
    }
};
