import ensureDetails from './ensureDetails';
import switchView from './switchView';

export default postId => 
  (dispatch, getState) => {
    dispatch(switchView('loading'));
    dispatch(ensureDetails(postId))
      .then(() => dispatch(switchView('postDetails', postId)));
  };
