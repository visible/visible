import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './pages/root';
import { createI18n } from './utils/i18n';

const main = async () => {
  const mountNode = document.getElementById('root');
  if (!mountNode) throw Error('No root found');
  const [i18n] = await createI18n();

  ReactDOM.render(<Root i18n={i18n} />, mountNode);
};

main();
