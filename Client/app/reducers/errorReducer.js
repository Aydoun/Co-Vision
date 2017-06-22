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
      return Object.assign({} , state , {...action} );
    case ERROR_CANCELLED:
      return Object.assign({} , state , {...action} );
    default:
      return state;
  }
}

export default visionReducer;
