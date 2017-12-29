import './graphmilker.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Initialising from '../components/Initialising';
import Login from './Login';
import PostList from './PostList';
import PostDetails from './PostDetails';
import actions from '../actions';

class GraphMilker extends Component {
  componentDidMount() {
    this.props.boot(this.props.config);
  }

  render() {
    const { pageName, viewName } = this.props;

    const getView = () => {
      switch (viewName) {
        case 'postDetails':
          return <PostDetails />;

        case 'posts':
          return <PostList />;

        case 'login':
          return <Login />;

        default:
          return <Initialising />;
      }
    };

    return (
      <div className="graphmilker">
        <h1 className="graphmilker__title">
          GraphMilker {pageName && `for '${pageName}'`}
        </h1>
        <div className="graphmilker__main">{getView()}</div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  pageName: state.config.pageName,
  viewName: state.view.name
});

const mapActions = {
  boot: actions.boot
};

export default connect(mapState, mapActions)(GraphMilker);
