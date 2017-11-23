import assign from 'lodash/assign';
import {
  DUPLICATE_VISION_ACTION,
} from 'constants/visionConstants';

const initialState = {
  visionList: [],
  allVisionList: [],
  loading:false,
  error: null,
  ContentString : '',
  visionFS : [],
  branchList : [],
  contributionStats : {
    contributorsList: {}
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
    default:
      return state;
  }
}

export default visionReducer;
