import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './appReducer';
import visionReducer from './visionReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  vision : visionReducer,
  user : userReducer,
  error : errorReducer,
  app : appReducer
});

export default rootReducer;
