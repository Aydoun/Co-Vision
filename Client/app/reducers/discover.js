import assign from 'lodash/assign';
import {
  DISCOVER_VISION,
  DISCOVER_LIKE_VISION
} from 'constants/discover';

const initialState = {
  discoverList : [],
  loading:false,
};

function discoverReducer(state = initialState, action) {
  if (action.type.indexOf('LOADING') >= 0) {
      return assign({}, state, { loading:true });
  }

  switch (action.type) {
    case DISCOVER_VISION:
      return assign({}, state, { ...action }, { loading:false });
    case DISCOVER_LIKE_VISION: {
      const newVisionList = state.discoverList.slice();
      const formalVisionIndex =
      newVisionList.findIndex(v => v._id === action.likedVisionId);
      newVisionList[formalVisionIndex].likes.push({});

      return assign({}, state, { discoverList: newVisionList });
    }
    default:
      return state;
  }
}

export default discoverReducer;
