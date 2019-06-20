export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_GET_ACCOUNTS_RESPONSE':
      return action.data || {};

    default:
      return state;
  }
};
