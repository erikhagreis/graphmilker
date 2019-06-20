import { get } from "lodash";

const DEFAULT_STATE = {
  loggedIn: false,
  permissions: null,
};

export default (state = DEFAULT_STATE, action) => {
  const { type, data } = action;

  switch (type) {
    case 'USER_LOGIN_RESPONSE':
    case 'USER_GET_LOGIN_STATUS_RESPONSE':
      return {
        ...state,
        ...data,
        loggedIn: get(data, 'status') === 'connected',
      };

    case 'USER_GET_PERMISSIONS_RESPONSE':
      return {
        ...state,
        permissions: data,
      }

    default:
      return state;
  }
};
