import * as fbApi from './fbApi';

export default postId => 
  (dispatch, getState) => {
    const post = getState().posts.details.find(post => post.id === postId);
    if (!post) {
      return dispatch(fbApi.getPostDetails(postId));
    }
    return Promise.resolve();
  };
