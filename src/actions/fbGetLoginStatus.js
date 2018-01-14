import * as Facebook from 'fb-sdk-wrapper';

export default (noCache = false) => {
  return dispatch => {
    dispatch({ type: 'GET_LOGIN_STATUS_REQUEST' });

    return Facebook.getLoginStatus()
      .then(response => {
        dispatch({
          type: 'GET_LOGIN_STATUS_RESPONSE',
          payload: {
            status: response.status,
            ...response.authResponse
          }
        });
        return response;
      }, noCache);
  };
};
