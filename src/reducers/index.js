import { combineReducers } from 'redux';

import authentication from './authentication';
import config from './config';
import posts from './posts';
import view from './view';

const graphmilkerState = combineReducers({
  authentication,
  config,
  posts,
  view
});

export default graphmilkerState;
