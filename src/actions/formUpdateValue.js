export default (formName, fieldName, fieldValue) => {
  return {
    type: 'FORM_UPDATE_VALUE',
    payload: { formName, fieldName, fieldValue }
  }
};
