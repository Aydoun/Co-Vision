import {
  DUPLICATE_VISION_ACTION,
} from 'constants/visionConstants';

const initialState = {
  visionList: [],
  loading:false,
  ContentString : '',
  visionFS : [],
  branchList : [],
  contributionStats : {},
  historyList : [{
      comment : 'Apprently This Vision lacks history!'
  }],
  visionList : [{
      title : 'No Active Visions Yet!',
      _id : 0
  }]
};


function visionReducer(state = initialState, action) {
  //  Intercept Loading actions
  if (action.type.indexOf('LOADING') >= 0) {
      return Object.assign({} , state , {loading:true});
  }

  switch (action.type) {
    case DUPLICATE_VISION_ACTION:
      return Object.assign({} , state , {...action} , {loading:false});
    default:
      return state;
  }
}

export default visionReducer;
