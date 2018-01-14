import * as Facebook from 'fb-sdk-wrapper';

export default () => {
  return dispatch => {
    dispatch({ type: 'LOGIN_REQUEST' });

    return Facebook.login()
      .then((response) => {
        dispatch({
          type: 'LOGIN_RESPONSE',
          payload: {
            status: !response.authResponse ? 'rejected' : response.status,
            ...response.authResponse
          }
        });
        return response;
      });
  };
};
