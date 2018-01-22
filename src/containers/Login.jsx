import './login.css';

import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions';
import Button from '../components/Button';

const mapStateToProps = (state, ownProps) => ({
  loginRejected: state.authentication.status === 'rejected'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: e => {
    e.preventDefault();
    dispatch(actions.login()).then(authentication => {
      if (authentication.status === 'connected') {
        dispatch(actions.switchView('posts'));
      }
    });
  }
});

const Login = ({ onLogin, loginRejected }) => {
  const getWarning = () => {
    if (loginRejected) {
      return <p className="gm-login__text gm-login__text--alert">Try again!</p>;
    }
    return '';
  };

  return (
    <div className="gm-login">
      <h2 className="gm-login__title gm-sectionTitle">Let's get started!</h2>
      <p className="gm-login__text">
        Please login to Facebook &amp; authorise this app. Nothing bad will
        happen, we promise!
      </p>
      <p className="gm-login__text">
        <Button onClick={onLogin}>Login &amp; Authorise</Button>
      </p>
      {getWarning()}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
