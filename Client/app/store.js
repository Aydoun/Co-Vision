import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import mySaga from './sagas';
import rootReducer from './reducers';

const LocationChangedMiddleware = store => next => (action) => {
  if (action.type.indexOf('LOCATION_CHANGE') >= 0) {
    const notifMessage = store.getState().notif.message;
    if (notifMessage.length > 0) {
      store.dispatch({
        type: 'APP_CHANGED_LOCATION'
      });
    }
  }
  next(action);
};

const defaultState = {};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, defaultState, applyMiddleware(
  sagaMiddleware, LocationChangedMiddleware, reduxLogger));

sagaMiddleware.run(mySaga);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
