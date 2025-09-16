import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk';
import reducers from "./redux/reducers"
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'));
  
reportWebVitals();
