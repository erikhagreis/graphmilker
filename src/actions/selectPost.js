export default (name, postId) => ({
  type: 'SELECT_POST',
  payload: { postId }
});