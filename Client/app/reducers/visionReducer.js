import { fromJS } from 'immutable';

import {
  VISION_SAVED,
  VISION_LOADING,
  VISION_LIST,
  VISION_LIST_LOADING
} from 'constants/visionConstants';

// The initial state of the App
const initialState = fromJS({
  visionList: [],
  loading:false,
  newVision : null,
  visionList : {
    result : {
        docs : []
    }
  }
});

function visionReducer(state = initialState, action) {
  switch (action.type) {
    case VISION_SAVED:
      return state
        .set('visionId', action.visionId);
    case VISION_LOADING:
      return state;
    case VISION_LIST_LOADING:
      return state;
    case VISION_LIST:
      return state
        .set('visionList' , action.visionList)
    default:
      return state;
  }
}

export default visionReducer;
