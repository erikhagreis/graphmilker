import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './reducers';
import Overlay from './components/Overlay';
import GraphMilker from './containers/GraphMilker';

import './app.css';

const store = createStore(
  reducer,
  {},
  applyMiddleware(thunkMiddleware, createLogger())
);

export default (element, config) => {
  ReactDOM.render(
    <Provider store={store}>
      <Overlay>
        <GraphMilker config={config} />
      </Overlay>
    </Provider>,
    element
  );
};
