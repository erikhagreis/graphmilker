export default (state = {}, action) => {
  switch (action.type) {
    case 'FORM_UPDATE_VALUE':
      const { formName, fieldName, fieldValue, fieldValidation } = action.data;
      const update = {
        ...state[ formName ],
        [ fieldName ]: {
          name: fieldName,
          value: fieldValue,
          validation: fieldValidation
        }
      };
      return {
        ...state,
        [ formName ]: update
      };

    default:
      return state;
  }
};
