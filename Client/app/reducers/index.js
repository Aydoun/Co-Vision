import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import vision from './visionReducer';
import user from './userReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  vision : vision,
  user : user,
  error : error
});

export default rootReducer;
