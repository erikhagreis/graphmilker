import { get } from 'lodash';
import * as Facebook from 'fb-sdk-wrapper';

export const getPosts = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_POSTS_REQUEST' });

    // automatically load next page, if an 'after' cursor exists
    const cursor = get(getState(), 'posts.cursors.after');
    const query = cursor ? `?after=${cursor}` : '';

    return Facebook.api(`/${getState().config.pageName}/posts${query}`, 'get', {
        access_token: getState().authentication.access_token,
        fields: 'id,type,message',
        limit: 10
      })
      .then((response) => {
        if (!response || response.error) {
          const error = response.error || 'Error occured in getPosts';
          dispatch({ type: 'GET_POSTS_ERROR', error });
          throw error;
        } else {
          dispatch({ type: 'GET_POSTS_RESPONSE', payload: response });
          return response;
        }
      });
  };
};

export const getPostDetails = postId => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_POST_DETAILS_REQUEST' });

    return Facebook.api(`/${postId}`, 'get', {
        access_token: getState().authentication.access_token,
        fields: 'id,type,created_time,message,message_tags,link,full_picture'
      })
      .then((response) => {
        if (!response || response.error) {
          const error = response.error || 'Error occured in getPostDetails';
          dispatch({ type: 'GET_POST_DETAILS_ERROR', error });
          throw error;
        } else {
          dispatch({ type: 'GET_POST_DETAILS_RESPONSE', payload: response });
          return response;
        }
      });
  };
};