import * as api from './fbApi';
import getLoginStatus from './fbGetLoginStatus';
import initApp from './fbInitApp';
import switchView from './switchView';

export default config => 
  (dispatch, getState) => {
    dispatch(switchView('loading'));
    dispatch(initApp(config))
      .then(() => dispatch(getLoginStatus()))
      .then(() => {
        if (getState().authentication.status === 'connected') {
          return dispatch(api.getPageId())
            .then(() => dispatch(switchView('overview')));
        } else {
          return dispatch(switchView('login'));
        }
      });
  }; 
