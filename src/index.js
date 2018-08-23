import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import { observe } from './components/Game';
import piece from './reducers/piece';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const reducers = combineReducers({
  piece
});

const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension()
);

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Board knightPosition={knightPosition} />
  </Provider>,
  rootEl
)