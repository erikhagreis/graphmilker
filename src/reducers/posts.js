import { findIndex } from 'lodash';

export default (state = { items: [] }, action) => {
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
        items: [
          ...state.items,
          ...action.payload.data
        ],
        cursors: action.payload.paging.cursors
      };

    case 'GET_POST_DETAILS_RESPONSE':
      const postIndex = findIndex(state.items, { id: action.payload.id});
      return {
        ...state,
        fetching: false,
        error: false,
        items: postIndex > -1 ?
          // replace the existing post object with the incoming one (should be always the case)
          immutableSplice(state.items, postIndex, 1, action.payload) : 
          // backup scenario: add the incoming post object to the list
          [ ...state.items, action.payload ]
      };

    default:
      return state;
  }
};

// https://vincent.billey.me/pure-javascript-immutable-array/
function immutableSplice(arr, start, deleteCount, ...items) {
  return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ];
}
