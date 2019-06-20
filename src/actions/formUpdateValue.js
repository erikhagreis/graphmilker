export default (formName, fieldName, fieldValue, fieldValidation) => {
  return {
    type: 'FORM_UPDATE_VALUE',
    data: { formName, fieldName, fieldValue, fieldValidation }
  }
};
