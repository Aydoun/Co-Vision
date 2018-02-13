import assign from 'lodash/assign';
import {
  DUPLICATE_USER_ACTION
} from 'constants/user';

const initialState = {
  authInfo : {},
  profile: {}
};


function userReducer(state = initialState, action) {
  switch (action.type) {
    case DUPLICATE_USER_ACTION:
      console.log('Hey MAMA');
      return assign({}, state, { ...action }, { loading:false });
    default:
      return assign({}, state, { loading:true });
  }
}

export default userReducer;
