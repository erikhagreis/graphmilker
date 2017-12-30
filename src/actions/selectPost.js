import closeGraphmilker from './closeGraphmilker';
import switchView from './switchView';

export default postId => 
  (dispatch, getState) => {
    dispatch({
      type: 'SELECT_POST',
      payload: { postId }
    });

    const post = getState().posts.items.find(post => post.id === postId);
    getState().config.onPostSelectedCallback(post);

    dispatch(closeGraphmilker());
    dispatch(switchView('posts'));
  };
