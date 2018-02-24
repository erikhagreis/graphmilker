export default (state = {}, action) => {
  switch (action.type) {
    case 'FORM_UPDATE_VALUE':
      const { formName, fieldName, fieldValue } = action.payload;
      return {
        ...state,
        [ formName ]: {
          [ fieldName ]: fieldValue
        }
      };

    default:
      return state;
  }
};
