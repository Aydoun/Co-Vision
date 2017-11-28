import assign from 'lodash/assign';
import {
  MAIL_MESSAGE_LOADING,
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
    default:
      return state;
  }
}

export default mailReducer;
