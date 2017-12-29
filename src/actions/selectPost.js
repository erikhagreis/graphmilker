export default (postId) => 
  (dispatch, getState) => { 
    dispatch({
      type: 'SELECT_POST',
      payload: { postId }
    });

    const post = getState().posts.items.find((post) => post.id === postId);
    getState().config.onPostSelectedCallback(post);
  };