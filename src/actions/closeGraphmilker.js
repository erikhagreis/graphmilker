import switchView from './switchView';

export default () => 
  (dispatch) => {
    dispatch({
      type: 'CLOSE_GRAPHMILKER'
    });

    window.graphmilker.hide();

    dispatch(switchView('overview'));
  };
