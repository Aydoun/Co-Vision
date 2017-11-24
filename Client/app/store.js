import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import mySaga from 'sagas';
import reduxLogger from 'redux-logger';
import rootReducer from 'reducers';

const defaultState = {};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, defaultState, applyMiddleware(sagaMiddleware, reduxLogger));

sagaMiddleware.run(mySaga);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
