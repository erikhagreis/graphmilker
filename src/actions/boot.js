import { get } from 'lodash';
import * as userApi from './fbUserApi';
import initApp from './fbInitApp';
import switchView from './switchView';

export const boot = (config) => {
  return async (dispatch) => {
    dispatch(switchView('loading'));
    await dispatch(initApp(config));
    await dispatch(trySessionContinue());
  };
}

const trySessionContinue = () => {
  return async (dispatch, getState) => {
    await dispatch(userApi.getLoginStatus());

    dispatch(doPostLoginChecks());
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    await dispatch(userApi.login());

    dispatch(doPostLoginChecks());
  }
};

const doPostLoginChecks = () => {
  return async (dispatch, getState) => {
    const loggedIn = get(getState(), 'userAuth.loggedIn', false);
    if (!loggedIn) {
      dispatch(switchView('login'));
      return;
    }

    await dispatch(userApi.getPermissions());
    const permissionGranted = get(getState(), 'userAuth.permissions.pages_show_list') === 'granted';
    if (!permissionGranted) {
     dispatch(switchView('login'));
     return;
    }

    await dispatch(userApi.getAccounts());
    const pageName = get(getState(), 'config.pageName');
    const pageAccessToken = get(getState(), `pageAuth.${pageName}.access_token`);
    if (!pageAccessToken) {
      dispatch(switchView('login'));
      return;
    }

    dispatch(switchView('overview'));
  }
};

