import { map, zipObject } from 'lodash';
import * as Facebook from 'fb-sdk-wrapper';

export const getLoginStatus = (noCache = false) => {
  return (dispatch) => {
    dispatch({ type: 'USER_GET_LOGIN_STATUS_REQUEST' });

    return Facebook.getLoginStatus()
      .then(response => {
        dispatch({
          type: 'USER_GET_LOGIN_STATUS_RESPONSE',
          data: {
            status: response.status,
            ...response.authResponse
          }
        });
        return response;
      }, noCache);
  };
};

export const login = () => {
  return (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    return Facebook.login({
        scope: 'pages_show_list'
      })
      .then((response) => {
        dispatch({
          type: 'USER_LOGIN_RESPONSE',
          data: {
            status: !response.authResponse ? 'rejected' : response.status,
            ...response.authResponse
          }
        });
        return response;
      });
  };
};

export const getPermissions = () => {
  return (dispatch, getState) => {
    dispatch({type: 'USER_GET_PERMISSIONS_REQUEST' });

    return Facebook.api(`/me/permissions`, 'get', {
        access_token: getState().userAuth.access_token,
      })
      .then((response) => {
        if (!response || response.error) {
          const error = response.error || 'Error occured in getPermissions';
          dispatch({ type: 'USER_GET_PERMISSIONS_ERROR', error });
          throw error;
        } else {
          const keys = map(response.data, 'permission');
          const values = map(response.data, 'status');
          const permisions = zipObject(keys, values);

          dispatch({ type: 'USER_GET_PERMISSIONS_RESPONSE', data: permisions });
          return permisions;
        }
      });
  };
}

export const getAccounts = () => {
  return (dispatch, getState) => {
    dispatch({type: 'USER_GET_ACCOUNTS_REQUEST' });

    return Facebook.api(`/me/accounts`, 'get', {
        access_token: getState().userAuth.access_token,
        fields: 'access_token,name,id,page_token,username',
      })
      .then((response) => {
        if (!response || response.error) {
          const error = response.error || 'Error occured in getPageId';
          dispatch({ type: 'USER_GET_ACCOUNTS_ERROR', error });
          throw error;
        } else {
          const keys = map(response.data, 'username');
          const accounts = zipObject(keys, response.data);

          dispatch({ type: 'USER_GET_ACCOUNTS_RESPONSE', data: accounts });
          return accounts;
        }
      });
  };
}