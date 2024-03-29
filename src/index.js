import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux/store';
import App from './App';

// const store = configureStore();

ReactDOM.render(
  <Provider store={configureStore}>
    <Router>
      <App />
    </Router>,
  </Provider>,
  document.getElementById('root')
);
