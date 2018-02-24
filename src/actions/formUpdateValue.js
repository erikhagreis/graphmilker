export default (formName, fieldName, fieldValue, fieldValidation) => {
  return {
    type: 'FORM_UPDATE_VALUE',
    payload: { formName, fieldName, fieldValue, fieldValidation }
  }
};
