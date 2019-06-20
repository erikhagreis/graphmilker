import './login.css';

import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import actions from '../actions';
import Button from '../components/Button';

const mapStateToProps = (state, ownProps) => {
  const pageName = get(state, 'config.pageName');
  const happy = get(state, 'userAuth.status') === 'unknown';
  const loginFailed = get(state, 'userAuth.status') === 'rejected';
  const loggedIn = get(state, 'userAuth.loggedIn');
  const accessTokenMissing = loggedIn && !get(state, `pageAuth.${pageName}.access_token`);
  const permissionsMissing = loggedIn && get(state, 'userAuth.permissions.pages_show_list') !== 'granted';

  return {
    loginFailed,
    pageName,
    accessTokenMissing,
    permissionsMissing,
    happy,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: e => {
    e.preventDefault();
    dispatch(actions.login());
  }
});

const Login = ({ onLogin, loginFailed, pageName, accessTokenMissing, permissionsMissing, happy }) => {
  return (
    <div className="gm-login">
      <div className="gm-login__main">
        <h2 className="gm-login__title gm-sectionTitle">
          { happy ? "Let's get started!" : "Let's try again!"}
        </h2>
        <p className="gm-login__text">
          Please login to Facebook &amp; authorise this app.
        </p>
        <p className="gm-login__text">
          <Button onClick={onLogin}>Login &amp; Authorise</Button>
        </p>
      </div>
      {loginFailed && (
        <div className="gm-login__error">
          <p className="gm-login__errorText">
            Login to Facebook failed.
          </p>
        </div>
      )}
      {accessTokenMissing && (
        <div className="gm-login__error">
          <p className="gm-login__errorText">
            Allow GraphMilker to access the <b>{pageName}</b> Page on your behalf.
          </p>
        </div>
      )}
      {permissionsMissing && (
        <div className="gm-login__error">
          <p className="gm-login__errorText">
            Select <b>yes</b> when asked permission for Graphmilker to retrieve a list of your pages.
          </p>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
