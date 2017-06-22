import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import vision from './visionReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  vision,
  error
});

export default rootReducer;
