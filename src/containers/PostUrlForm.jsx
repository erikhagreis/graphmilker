import './posturlform.scss';

import { get } from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import actions from '../actions';

class PostUrlForm extends Component {

  render() {
    const { formData, formSubmit, formUpdateValues } = this.props;

    return (
      <form className='gm-postUrlForm' onSubmit={formSubmit}>
        <h2 className='gm-postUrlForm__heading gm-visuallyhidden'>
          Enter the URL of a Facebook post
        </h2>
        <div className='gm-postUrlForm__field'>
          <input
            className='gm-postUrlForm__input'
            type='text'
            name='postUrl'
            ref='postUrl'
            placeholder='Paste status update link here'
            value={get(formData, 'postUrl.value', '')}
            onChange={formUpdateValues} />
          <input
            className='gm-button gm-postUrlForm__submit'
            type='submit'
            value='▶ go' />
        </div>
        {this.getValidationMessage()}
      </form>
    );
  }

  getValidationMessage() {
    const { formData } = this.props;
    const validationMessage = get(formData, 'postUrl.validation');
    if (!validationMessage) {
      return undefined;
    }
    return (
      <div className="gm-postUrlForm__validationMessage">{validationMessage}</div>
    );
  }
}

const mapStateToProps = state => ({
  formData: get(state, 'formData.postUrlForm', {})
});

const mapDispatchToProps = (dispatch) => ({
  formSubmit: (event) => {
    event.preventDefault();
    return dispatch(actions.urlFormSubmit());
  },
  formUpdateValues: (event) => {
    return dispatch(actions.formUpdateValue('postUrlForm', event.target.name, event.target.value))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostUrlForm);
