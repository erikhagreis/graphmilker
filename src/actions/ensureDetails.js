import * as fbApi from './fbApi';

export default postId => 
  (dispatch, getState) => {
    const post = getState().posts.items.find(post => post.id === postId);
    if (!post || !post.detailsLoaded) {
      return dispatch(fbApi.getPostDetails(postId));
    }
    return Promise.resolve();
  };
