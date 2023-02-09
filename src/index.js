import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Store
import { store } from './redux/store.js';

// App
import App from './app.js';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)