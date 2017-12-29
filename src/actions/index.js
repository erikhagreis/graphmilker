import * as api from './fbApi';
import getLoginStatus from './fbGetLoginStatus';
import initApp from './fbInitApp';
import login from './fbLogin';
import selectPost from './selectPost';
import switchView from './switchView';

const boot = config => (dispatch, getState) => {
  dispatch(initApp(config))
    .then(() => dispatch(getLoginStatus()))
    .then(() => {
      if (getState().authentication.status === 'connected') {
        return dispatch(switchView('posts'));
      } else {
        return dispatch(switchView('login'));
      }
    });
};

export default {
  boot,
  api,
  getLoginStatus,
  initApp,
  login,
  selectPost,
  switchView
};
