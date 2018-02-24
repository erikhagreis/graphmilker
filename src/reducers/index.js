import { combineReducers } from 'redux';

import authentication from './authentication';
import config from './config';
import formData from './formData';
import posts from './posts';
import view from './view';

const graphmilkerState = combineReducers({
  authentication,
  config,
  formData,
  posts,
  view
});

export default graphmilkerState;
