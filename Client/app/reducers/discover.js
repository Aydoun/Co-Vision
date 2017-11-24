import assign from 'lodash/assign';
import {
  DISCOVER_VISION
} from 'constants/discover';

const initialState = {
  discoverList : [],
  loading:false,
};

function visionReducer(state = initialState, action) {
  if (action.type.indexOf('LOADING') >= 0) {
      return assign({}, state, { loading:true });
  }

  switch (action.type) {
    case DISCOVER_VISION:
      return assign({}, state, { ...action }, { loading:false });
    default:
      return state;
  }
}

export default visionReducer;
