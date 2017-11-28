import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import assign from 'lodash/assign';
import appReducer from './app';
import visionReducer from './vision';
import userReducer from './user';
import errorReducer from './error';
import discoverReducer from './discover';
import mailReducer from './mail';

const loadingReducer = (state, _) => (
  assign({}, state, { loading: true })
);

const rootReducer = combineReducers({
  routing: routerReducer,
  vision : visionReducer,
  user : userReducer,
  error : errorReducer,
  discover: discoverReducer,
  app : appReducer,
  mail: mailReducer
  // loading: loadingReducer
});

export default rootReducer;
