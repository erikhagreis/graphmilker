import { get } from 'lodash';

/**
 * Proxy to FB.api.
 * @see: https://developers.facebook.com/docs/javascript/reference/FB.api
 */

export const getPosts = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_POSTS_REQUEST' });

    return new Promise((resolve, reject) => {
      // automatically load next page, if an 'after' cursor exists
      const cursor = get(getState(), 'posts.cursors.after');
      const query = cursor ? `?after=${cursor}` : '';

      window.FB.api(
        `/${getState().config.pageName}/posts${query}`,
        {
          access_token: getState().authentication.access_token,
          fields: 'id,type,message',
          limit: 10
        },
        response => {
          if (!response || response.error) {
            const error = response.error || 'Error occured in getPosts';
            dispatch({ type: 'GET_POSTS_ERROR', error });
            reject(error);
          } else {
            dispatch({ type: 'GET_POSTS_RESPONSE', payload: response });
            resolve(response);
          }
        }
      );
    });
  };
};

export const getPostDetails = postId => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_POST_DETAILS_REQUEST' });

    return new Promise((resolve, reject) => {
      window.FB.api(
        `/${postId}`,
        {
          access_token: getState().authentication.access_token,
          fields: 'id,type,created_time,message,message_tags,link,full_picture'
        },
        response => {
          if (!response || response.error) {
            const error = response.error || 'Error occured in getPostDetails';
            dispatch({ type: 'GET_POST_DETAILS_ERROR', error });
            reject(error);
          } else {
            dispatch({ type: 'GET_POST_DETAILS_RESPONSE', payload: response });
            resolve(response);
          }
        }
      );
    });
  };
};
