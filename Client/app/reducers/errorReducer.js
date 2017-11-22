import assign from 'lodash/assign';
import {
  ERROR_THROWN,
  ERROR_CANCELLED
} from 'constants/errorConstants';

const initialState = {
  status: true,
  errorMessage:''
};

function visionReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_THROWN:
      return assign({}, state, { ...action });
    case ERROR_CANCELLED:
      return assign({}, state, { ...action });
    default:
      return state;
  }
}

export default visionReducer;
