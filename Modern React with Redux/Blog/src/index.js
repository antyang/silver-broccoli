import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
// Router decides what component to show
// browserHistory is an obj that tells react-router
// - how to interpret changes to the URL
// ie. http://www.blog.com/post/5 - post/5 changes
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(
  promise
  // reaches promises before reducers
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
