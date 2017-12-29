export default (state = {}, action) => {
  switch (action.type) {
    case 'INIT_APP_START':
      return {
        pending: true
      };

    case 'INIT_APP_COMPLETE':
      return {
        pending: false,
        ...action.payload
      };

    default:
      return state;
  }
};
