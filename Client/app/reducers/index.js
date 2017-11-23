import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './app';
import visionReducer from './vision';
import userReducer from './user';
import errorReducer from './error';

const rootReducer = combineReducers({
  routing: routerReducer,
  vision : visionReducer,
  user : userReducer,
  error : errorReducer,
  app : appReducer
});

export default rootReducer;
