import { combineReducers } from 'redux';

import userAuth from './userAuth';
import config from './config';
import formData from './formData';
import pageAuth from './pageAuth';
import permissions from './permissions';
import posts from './posts';
import view from './view';

const graphmilkerState = combineReducers({
  config,
  formData,
  pageAuth,
  permissions,
  posts,
  userAuth,
  view,
});

export default graphmilkerState;
