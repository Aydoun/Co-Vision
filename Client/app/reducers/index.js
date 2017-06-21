import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import vision from './visionReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  vision
});

export default rootReducer;
