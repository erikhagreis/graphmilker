import * as Facebook from 'fb-sdk-wrapper';

export default config => {
  return dispatch => {
    dispatch({ type: 'INIT_APP_START' });

    return Facebook.load()
      .then(() => {
        Facebook.init({
          appId: config.appId
        });
        dispatch({ type: 'INIT_APP_COMPLETE', payload: config });
        return config;
      });
  };
};
