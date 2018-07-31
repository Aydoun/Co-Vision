import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import assign from 'lodash/assign';
import appReducer from './app';
import visionReducer from './vision';
import userReducer from './user';
import discoverReducer from './discover';
import courrierReducer from './courrier';

const rootReducer = combineReducers({
  routing: routerReducer,
  vision : visionReducer,
  user : userReducer,
  discover: discoverReducer,
  app : appReducer,
  courrier: courrierReducer
});

export default rootReducer;
