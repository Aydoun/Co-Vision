import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import mySaga from './sagas';
import rootReducer from './reducers';

const LocationChangedMiddleware = store => next => (action) => {
  if (action.type.indexOf('LOCATION_CHANGE') >= 0) {
    console.log(action, 'action')
    // const appBreadCrumb = store.getState().app.appBreadCrumb;
    // store.dispatch({
    //   type: 'UPDATE_NOTIFCATION',
    //   data: {
    //     message: 'mamammia',
    //     type: 'success',
    //   }
    // });
    // if (notifMessage.length > 0) {
      
    // }
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
