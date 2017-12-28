import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducers';
import actions from './actions';
import Overlay from './components/Overlay';
import GraphMilker from './containers/GraphMilker';

import './index.css';

const config = {
  appId: '1000690343378486',
  pageName: 'dewolfficial',
};

const store = createStore(reducer, {},
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  ));
  
store.dispatch(actions.initApp(config))
  .then(() => store.dispatch(actions.getLoginStatus()))
  .then(() => {
    if (store.getState().authentication.status === 'connected') {
      return store.dispatch(actions.switchView('posts'));
    } else {
      return store.dispatch(actions.switchView('login'));
    }
  });

ReactDOM.render(
  <Provider store={store}>
    <Overlay>
      <GraphMilker />
    </Overlay>
  </Provider>, 
  document.getElementById('root')
);
