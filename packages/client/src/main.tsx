import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './pages/root';

const main = () => {
  const mountNode = document.getElementById('root');
  if (!mountNode) throw Error('No root found');

  ReactDOM.render(<Root />, mountNode);
};

main();
