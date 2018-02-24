export default (state = {}, action) => {
  switch (action.type) {
    case 'INIT_APP_START':
      return {
        ...state,
        pending: true
      };

    case 'INIT_APP_COMPLETE':
      return {
        ...state,
        pending: false,
        ...action.payload
      };

    case 'GET_PAGE_ID_RESPONSE':
      return {
        ...state,
        pageId: action.payload.id
      }

    default:
      return state;
  }
};
