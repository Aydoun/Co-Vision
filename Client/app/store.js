import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import mySaga from './sagas';
import rootReducer from './reducers';

const LocationChangedMiddleware = store => next => (action) => {
  if (action.type.indexOf('LOCATION_CHANGE') >= 0) {
    const CBC = store.getState().app.appBreadCrumb;
    const lastLink = CBC.pop();
    const continueUpdate = typeof lastLink === 'undefined' || lastLink.link !== action.payload.pathname;
    
    if (continueUpdate) {
      store.dispatch({
        type: 'UPDATE_BREADCRUMB',
        path: action.payload.pathname,
      });
    }
  }
  next(action);
};

const defaultState = {};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, defaultState, applyMiddleware(
  sagaMiddleware, LocationChangedMiddleware, reduxLogger, ));

sagaMiddleware.run(mySaga);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
