/**
 * Proxy to FB.getLoginStatus.
 * @see: https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
 */
export default (noCache = false) => {
  return dispatch => {
    dispatch({ type: 'GET_LOGIN_STATUS_REQUEST' });

    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus(response => {
        dispatch({
          type: 'GET_LOGIN_STATUS_RESPONSE',
          payload: {
            status: response.status,
            ...response.authResponse
          }
        });
        resolve(response);
      }, noCache);
    });
  };
};
