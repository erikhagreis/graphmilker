import React from 'react'
import { connect } from 'react-redux'

import Initialising from '../components/Initialising';
import Login from './Login';
import PostList from './PostList';
import PostDetails from './PostDetails';

import './graphmilker.css';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  viewName: state.view.name
});

const GraphMilker = ({ viewName }) => {
  const getView = () => {
    switch (viewName) {
      case 'postDetails':
        return <PostDetails />

      case 'posts':
        return <PostList/>;
  
      case 'login':
        return <Login/>;
  
      default:
        return <Initialising/>;
    }
  };

  return <div className="graphmilker">
    <h1 className="graphmilker__title">
      GraphMilker
    </h1>
    <div className="graphmilker__main">
      {getView()}
    </div>
  </div>
};

export default connect(
  mapStateToProps
)(GraphMilker);
