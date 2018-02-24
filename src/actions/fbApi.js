import { get, pick, reduce, set } from 'lodash';
import * as Facebook from 'fb-sdk-wrapper';

export const getPageId = () => {
  return (dispatch, getState) => {
      dispatch({type: 'GET_PAGE_ID_REQUEST' });

      return Facebook.api(`/${getState().config.pageName}`, 'get', {
          access_token: getState().authentication.access_token,
          fields: 'id'
        })
        .then((response) => {
          if (!response || response.error) {
            const error = response.error || 'Error occured in getPageId';
            dispatch({ type: 'GET_PAGE_ID_ERROR', error });
            throw error;
          } else {
            dispatch({ type: 'GET_PAGE_ID_RESPONSE', payload: response });
            return response;
          }
        });
  };
}

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
        } else if (response.type === 'link') {
          return scrapeUrl(response.link)
            .then(fullGraphMeta => {
              const graphMeta = reduce(
                pick(fullGraphMeta, [ 'title', 'description', 'url' ] ),
                (obj, value, key) => {
                  set(obj, `og_${key}`, value);
                  return obj;
                },
                {}
              );
              return {
                ...response,
                ...graphMeta
              };
            });
        }
        return response;
      })
      .then((payload) => {
        dispatch({ type: 'GET_POST_DETAILS_RESPONSE', payload });
        return payload;
      });
  };
};

function scrapeUrl(url) {
  return Facebook.api('/', 'post', {
    'scrape': true,
    'id': url
  });
}
