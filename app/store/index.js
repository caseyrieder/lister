/**
 * @flow
 */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'

// only log stuff in development mode
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

// configure the store by adding middleware libraries
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware, // logs all state changes
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

// create store object by running `configureStore` fxn (w/o initial state)
const store = configureStore({});

export default store;
