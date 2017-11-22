import assign from 'lodash/assign';

import {
  DUPLICATE_USER_ACTION,
} from 'constants/userConstants';

const initialState = {
  userGeneralInfo : {}
};


function visionReducer(state = initialState, action) {

  switch (action.type) {
    case DUPLICATE_USER_ACTION:
      return assign({} , state , {...action} , {loading:false});
    default:
      return assign({} , state , {loading:true});
  }
}

export default visionReducer;
