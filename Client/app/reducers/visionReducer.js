//import { fromJS } from 'immutable';

import {
  DUPLICATE_VISION_ACTION,
  VISION_SAVED
} from 'constants/visionConstants';

const initialState = {
  visionList: [],
  loading:false,
  newVision : null,
  visionList : {
    result : {
        docs : []
    }
  }
};

function visionReducer(state = initialState, action) {
  switch (action.type) {
    case DUPLICATE_VISION_ACTION:
      return Object.assign({} , state , {...action});
    case VISION_SAVED:
      return Object.assign({} , state , {...action})
    default:
      return state;
  }
}

export default visionReducer;
