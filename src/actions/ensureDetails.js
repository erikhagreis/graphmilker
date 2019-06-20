import * as pageApi from './fbPageApi';

export default postId =>
  (dispatch, getState) => {
    const post = getState().posts.details.find(post => post.id === postId);
    if (!post) {
      return dispatch(pageApi.getPostDetails(postId));
    }
    return Promise.resolve();
  };
