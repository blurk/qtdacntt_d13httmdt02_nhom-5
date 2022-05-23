import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './bootstrap.min.css';
import './index.css';
import store from './store';

import './i18n';

ReactDOM.render(
  <Suspense fallback="...">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
