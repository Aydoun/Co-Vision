import assign from 'lodash/assign';
import {
  NOTIFY_ACTION,
  APP_LOCATION_CHANGE
} from 'constants/notif';

const initialState = {
  status: true,
  message:''
};

function notifReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_ACTION:
      return assign({}, state, { ...action });
    case APP_LOCATION_CHANGE:
      return assign({}, state, { status: true, message: '' });
    default:
      return state;
  }
}

export default notifReducer;
