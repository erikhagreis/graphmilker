import { findIndex } from 'lodash';

export default (state = { stubs: [], details: [] }, action) => {
  switch (action.type) {
    case 'GET_POSTS_REQUEST':
    case 'GET_POST_DETAILS_REQUEST':
      return {
        ...state,
        fetching: true,
        error: false
      };

    case 'GET_POSTS_ERROR':
    case 'GET_POST_DETAILS_ERROR':
      return {
        ...state,
        fetching: false,
        error: true
      };

    case 'GET_POSTS_RESPONSE':
      return {
        ...state,
        fetching: false,
        error: false,
        stubs: [ ...state.stubs, ...action.data.posts ],
        cursors: action.data.paging.cursors
      };

    case 'GET_POST_DETAILS_RESPONSE':
      const postIndex = findIndex(state.details, { id: action.data.id });
      return {
        ...state,
        fetching: false,
        error: false,
        details:
          postIndex > -1
            ? // if a stub exists, replace it (should not happen)
              immutableSplice(state.details, postIndex, 1, { detailsLoaded: true, ...action.data })
            : // else add it
              [...state.details, action.data ]
      };

    default:
      return state;
  }
};

// https://vincent.billey.me/pure-javascript-immutable-array/
function immutableSplice(arr, start, deleteCount, ...items) {
  return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
}
