import assign from 'lodash/assign';
import {
  APP_MENU_CHANGE,
  UPDATE_NOTIFCATION
} from 'constants/app';

const initialState = {
  menuContent : [],
  notificationKey: 0,
  notificationData: {
    type: 'success',
    message: '',
  },
  appBreadCrumb: ['ok', 'doki']
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_MENU_CHANGE:
      return assign({}, state, { ...action });
    case UPDATE_NOTIFCATION:
      return assign({}, state, {
        notificationKey: state.notificationKey + 1,
        notificationData: action.data
      });
    default:
      return state;
  }
}

export default appReducer;
