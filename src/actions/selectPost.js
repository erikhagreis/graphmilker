import closeGraphmilker from './closeGraphmilker';

export default postId =>
  (dispatch, getState) => {
    dispatch({
      type: 'SELECT_POST',
      data: { postId }
    });

    const post = getState().posts.details.find(post => post.id === postId);
    getState().config.onPostSelectedCallback(post);

    dispatch(closeGraphmilker());
  };
