import './app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './reducers';
import Overlay from './components/Overlay';
import GraphMilker from './containers/GraphMilker';
import actions from './actions';

const store = createStore(
  reducer,
  {},
  applyMiddleware(thunkMiddleware, createLogger())
);

export default (element, config) => {
  ReactDOM.render(
    <Provider store={store}>
      <Overlay onClose={() => store.dispatch(actions.closeGraphmilker())}>
        <GraphMilker config={config} />
      </Overlay>
    </Provider>,
    element
  );
};
