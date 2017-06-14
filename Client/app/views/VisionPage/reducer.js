import { fromJS } from 'immutable';

import {
  VISION_SAVED,
  VISION_LOADING
} from './constants';

// The initial state of the App
const initialState = fromJS({
  visionList: [],
  loading:false,
  newVision : null
});

function visionReducer(state = initialState, action) {
  switch (action.type) {
    case VISION_SAVED:
      return state
        .set('visionId', action.visionId);
    case VISION_LOADING:
      return state;
    default:
      return state;
  }
}

export default visionReducer;
