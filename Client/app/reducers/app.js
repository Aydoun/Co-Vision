import assign from 'lodash/assign';
import {
  APP_MENU_CHANGE
} from 'constants/app';

const initialState = {
  menuContent : []
};

function visionReducer(state = initialState, action) {
  switch (action.type) {
    case APP_MENU_CHANGE:
      return assign({}, state, { ...action });
    default:
      return state;
  }
}

export default visionReducer;
