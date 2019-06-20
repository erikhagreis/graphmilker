export default (state = {}, action) => {
  switch (action.type) {
    case 'SWITCH_VIEW':
      return {
        ...action.data
      };

    default:
      return state;
  }
};
