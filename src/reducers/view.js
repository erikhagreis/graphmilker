export default (state = {}, action) => {
  switch (action.type) {
    case 'SWITCH_VIEW':
      return {
        ...action.payload
      };

    default:
      return state
  }
};
