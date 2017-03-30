import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import css from './styles/home.styl'
import App from './containers/index.jsx'
import store from './configureStore';


render(
  <Provider store = {store}>
    <App/>
  </Provider>
  ,document.getElementById('root'));
