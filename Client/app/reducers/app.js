import assign from 'lodash/assign';
import * as C from 'constants/app';
import { getBreadcrumb } from '../utils';

const initialState = {
  menuContent : [],
  notificationKey: 0,
  notificationData: {
    type: 'success',
    message: '',
  },
  appBreadCrumb: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case C.APP_MENU_CHANGE:
      return assign({}, state, { ...action });
    case C.UPDATE_NOTIFCATION:
      return assign({}, state, {
        notificationKey: state.notificationKey + 1,
        notificationData: action.data
      });
    case C.UPDATE_BREADCRUMB:
      return assign({}, state, {
        appBreadCrumb: getBreadcrumb(action.path),
      });
    default:
      return state;
  }
}

export default appReducer;
