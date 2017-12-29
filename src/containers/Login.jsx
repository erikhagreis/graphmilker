import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions';
import Button from '../components/Button';

import './login.css';

const mapStateToProps = (state, ownProps) => ({
  loginRejected: state.authentication.status === 'rejected'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (e) => {
    e.preventDefault();
    dispatch(actions.login())
      .then((authentication) => {
        if (authentication.status === 'connected') {
          dispatch(actions.switchView('posts'));
        }
      });
  }
});

const Login = ({onLogin, loginRejected}) => {
  const getWarning = () => {
    if (loginRejected) {
      return <p className="login__text login__text--alert">
        Try again!
      </p>
    }
    return '';
  }
  
  return <div className="login">
      <h2 className="login__title sectionTitle">
        Let's get started!
      </h2>
      <p className="login__text">
        Please login to Facebook &amp; authorise this app. Nothing bad will happen, we promise!
      </p>
      <p className="login__text">
        <Button onClick={onLogin}>
          Login &amp; Authorise
        </Button>
      </p>
      {getWarning()}
  </div>
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
