import './posturlform.css';

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
            value={formData.postUrl || ''}
            onChange={formUpdateValues} />
          <input
            className='gm-button gm-postUrlForm__submit'
            type='submit'
            value='▶ go' />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  formData: state.formData.postUrlForm || {}
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
