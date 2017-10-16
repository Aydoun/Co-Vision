import {
  APP_MENU_CHANGE
} from 'constants/appConstants';

const initialState = {
  menuContent : []
};

function visionReducer(state = initialState, action) {

  switch (action.type) {
    case APP_MENU_CHANGE:
      return Object.assign({} , state , {...action} );
    default:
      return state;
  }
}

export default visionReducer;
