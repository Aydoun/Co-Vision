//import { fromJS } from 'immutable';

import {
  DUPLICATE_VISION_ACTION,
} from 'constants/visionConstants';

const initialState = {
  visionList: [],
  loading:false,
  ContentString : '',
  visionFS : [],
  branchList : [],
  historyList : [{
      comment : 'Apprently This Vision lacks history!'
  }],
  visionList : [{
      title : 'No Active Visions Yet!',
      _id : 0
  }]
};


function visionReducer(state = initialState, action) {

  switch (action.type) {
    case DUPLICATE_VISION_ACTION:
      return Object.assign({} , state , {...action} , {loading:false});
    default:
      return Object.assign({} , state , {loading:true});
  }
}

export default visionReducer;
