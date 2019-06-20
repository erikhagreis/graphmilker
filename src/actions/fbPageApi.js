import { get, map, pick, reduce, set } from 'lodash';
import parseUrl from 'parse-url';
import * as Facebook from 'fb-sdk-wrapper';

const getPageName = (state) =>  get(state, 'config.pageName');

const getUserAccessToken = (state) => get(state, `userAuth.access_token`);

const getPageAccessToken = (state) => get(
  state,
  `pageAuth.${getPageName(state)}.access_token`,
  getUserAccessToken(state)
);

const getPostType = (post) => get(post, 'attachments.data.0.media_type', 'status');

const getLinkUrl = (post) => {
  const shimmedUrl = get(post, 'attachments.data.0.url', 'status');
  const { query } = parseUrl(shimmedUrl);

  return query.u ? decodeURIComponent(query.u) : shimmedUrl;
}

const scrapeUrl = async (url) => Facebook.api('/', 'post', {
  'scrape': true,
  'id': url
});

export const getPageId = () => {
  return (dispatch, getState) => {
      dispatch({type: 'GET_PAGE_ID_REQUEST' });

      return Facebook.api(`/${getPageName(getState())}`, 'get', {
          access_token: getPageAccessToken(getState()),
          fields: 'id'
        })
        .then((response) => {
          if (!response || response.error) {
            const error = response.error || 'Error occured in getPageId';
            dispatch({ type: 'GET_PAGE_ID_ERROR', error });
            throw error;
          } else {
            dispatch({ type: 'GET_PAGE_ID_RESPONSE', data: response });
            return response;
          }
        });
  };
};

export const getPosts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'GET_POSTS_REQUEST' });

    const cursor = get(getState(), 'posts.cursors.after');
    const query = cursor ? `?after=${cursor}` : '';

    const response = await Facebook.api(`/${getPageName(getState())}/posts${query}`, 'get', {
      access_token: getPageAccessToken(getState()),
      fields: 'id,message,attachments{media_type}',
      limit: 10
    });

    if (!response || response.error) {
      const error = response.error || 'Error occured in getPosts';
      dispatch({ type: 'GET_POSTS_ERROR', error });
      throw error;
    }

    const posts = map(response.data, (post) => ({
      ...post,
      type: getPostType(post),
    }));

    const data = {
      posts,
      paging: response.paging,
    };

    dispatch({ type: 'GET_POSTS_RESPONSE', data });

    return data;
  };
};

export const getPostDetails = postId => {
  return async (dispatch, getState) => {
    dispatch({ type: 'GET_POST_DETAILS_REQUEST' });

    const response = await Facebook.api(`/${postId}`, 'get', {
      access_token: getPageAccessToken(getState()),
      fields: 'id,attachments{media_type,url,url_unshimmed},created_time,message,message_tags,full_picture'
    });

    if (!response || response.error) {
      const error = response.error || 'Error occured in getPostDetails';
      dispatch({ type: 'GET_POST_DETAILS_ERROR', error });
      throw error;
    }

    const postType = getPostType(response);
    const linkUrl = getLinkUrl(response);

    let graphMeta;
    if (postType === 'link') {
      if (linkUrl) {
        const fullGraphMeta = await scrapeUrl(linkUrl);
        graphMeta = reduce(
          pick(fullGraphMeta, [ 'title', 'description', 'url' ] ),
          (obj, value, key) => {
            set(obj, `og_${key}`, value);
            return obj;
          },
          {}
        );
      }
    }

    const post = {
      ...response,
      ...graphMeta,
      type: postType,
      link: linkUrl,
    };

    dispatch({ type: 'GET_POST_DETAILS_RESPONSE', data: post });

    return post;
  };
};
