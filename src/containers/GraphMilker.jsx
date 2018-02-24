import './graphmilker.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from '../components/Error';
import Loading from '../components/Loading';
import Login from './Login';
import Overview from '../components/Overview';
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

        case 'overview':
          return <Overview />;

        case 'login':
          return <Login />;

        case 'loading':
          return <Loading />;
          
        default:
          return <Error type="404" />;
      }
    };

    return (
      <div className="gm-graphmilker">
        <h1 className="gm-graphmilker__title">
          GraphMilker {pageName && `for '${pageName}'`}
        </h1>
        <div className="gm-graphmilker__main">
          {getView()}
        </div>
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
