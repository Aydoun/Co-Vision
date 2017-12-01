import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import assign from 'lodash/assign';
import appReducer from './app';
import visionReducer from './vision';
import userReducer from './user';
import notifReducer from './notif';
import discoverReducer from './discover';
import mailReducer from './mail';

const loadingReducer = (state, _) => (
  assign({}, state, { loading: true })
);

const rootReducer = combineReducers({
  routing: routerReducer,
  vision : visionReducer,
  user : userReducer,
  notif : notifReducer,
  discover: discoverReducer,
  app : appReducer,
  mail: mailReducer
  // loading: loadingReducer
});

export default rootReducer;
