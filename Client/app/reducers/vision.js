import assign from 'lodash/assign';
import {
  DUPLICATE_VISION_ACTION,
  SAVE_USER_LIKE
} from 'constants/vision';

const initialState = {
  visionList: [],
  loading:false,
  ContentString : '',
  visionFS : [],
  branchList : [],
  contributionStats : {
    contributorsList: {},
    vision: {}
  },
  historyList : []
};

function visionReducer(state = initialState, action) {
  //  Intercept Loading actions
  if (action.type.indexOf('LOADING') >= 0) {
      return assign({}, state, { loading:true });
  }

  switch (action.type) {
    case DUPLICATE_VISION_ACTION:
      return assign({}, state, { ...action }, { loading:false });
    case SAVE_USER_LIKE: {
      const newVisionList = state.visionList.slice();
      const formalVisionIndex =
      newVisionList.findIndex(v => v._id === action.likedVisionId);
      action.add ?
      newVisionList[formalVisionIndex].likes += 1 :
      newVisionList[formalVisionIndex].likes -= 1;

      return assign({}, state, { visionList: newVisionList });
    }
    default:
      return state;
  }
}

export default visionReducer;
