import getLoginStatus from './fbGetLoginStatus';
import initApp from './fbInitApp';
import switchView from './switchView';

export default config => 
  (dispatch, getState) => {
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
