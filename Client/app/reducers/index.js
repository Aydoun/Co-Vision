import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import vision from './visionReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  vision
});

export default rootReducer;
