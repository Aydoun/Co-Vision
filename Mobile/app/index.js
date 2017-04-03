import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import AppContainer from './AppContainer';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
let store = createStoreWithMiddleware(reducers);


export default class Index extends Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    );
  }
}
