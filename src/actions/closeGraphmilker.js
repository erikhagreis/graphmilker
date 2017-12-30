export default () => 
  (dispatch) => {
    dispatch({
      type: 'CLOSE_GRAPHMILKER'
    });

    window.graphmilker.hide();
  };
