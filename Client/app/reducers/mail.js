import assign from 'lodash/assign';
import {
  MAIL_MESSAGE_LOADING,
  SAVE_SENT_MESSAGE,
  DUPLICATE_MAIL_ACTION
} from 'constants/mail';

const initialState = {
  mailList : {
    conversations: [],
    userMeta: {}
  }
};

function mailReducer(state = initialState, action) {
  //  Intercept Loading actions
  if (action.type.indexOf('LOADING') >= 0) {
      return assign({}, state, { loading:true });
  }

  switch (action.type) {
    case DUPLICATE_MAIL_ACTION:
      return assign({}, state, { ...action }, { loading:false });
    case SAVE_SENT_MESSAGE: {
      const newMailList = assign({}, state.mailList);
      const newConversations = newMailList.conversations.slice();
      const formalConversationIndex =
      newConversations.findIndex(v => v._id === action.conversationId);
      newConversations[formalConversationIndex].messages.push(action.lastMessage);
      newMailList.conversations = newConversations;

      return assign({}, state, { mailList: newMailList });
    }
    default:
      return state;
  }
}

export default mailReducer;
