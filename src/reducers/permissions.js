export default (state = [], action) => {
  switch (action.type) {
    case 'USER_GET_PERMISSIONS_RESPONSE':
      return action.data;

    default:
      return state;
  }
};
