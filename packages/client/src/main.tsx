import * as React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './pages/home';

const main = () => {
  const mountNode = document.getElementById('root');
  if (!mountNode) throw Error('No root found');

  ReactDOM.render(<Home />, mountNode);
};

main();
