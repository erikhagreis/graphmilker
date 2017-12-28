export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'GET_LOGIN_STATUS_REQUEST':
      return {
        ...state,
        pending: true
      };

    case 'LOGIN_RESPONSE':
    case 'GET_LOGIN_STATUS_RESPONSE':
      return {
        ...state,
        pending: false,
        ...action.payload
      };

    default:
      return state
  }
};
