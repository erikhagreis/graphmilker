/** 
 * Proxy to FB.login.
 * @see: https://developers.facebook.com/docs/reference/javascript/FB.login
 */

export default () => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    return new Promise((resolve, reject) => {
      window.FB.login(response => {
        dispatch({ type: 'LOGIN_RESPONSE', payload: {
          status: !response.authResponse ? 'rejected' : response.status,
          ...response.authResponse
        } });
        resolve(response);
      });
    });
  };
};
