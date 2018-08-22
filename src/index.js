import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Board knightPosition={[0, 0]} />,
  rootEl
);