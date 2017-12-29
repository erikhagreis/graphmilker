export default config => {
  return dispatch => {
    dispatch({ type: 'INIT_APP_START' });

    return new Promise((resolve, reject) => {
      const injectFB = (d, s, id) => {
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        js.async = true;
        fjs.parentNode.insertBefore(js, fjs);
      };
      const check = () => {
        if (window.FB) {
          window.FB.init({
            appId: config.appId,
            xfbml: false,
            version: 'v2.9'
          });
          dispatch({ type: 'INIT_APP_COMPLETE', payload: config });
          resolve(config);
        } else {
          setTimeout(check, 100);
        }
      };
      injectFB(document, 'script', 'facebook-jssdk');
      check();
    });
  };
};
