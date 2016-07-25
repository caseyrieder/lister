/**
 * @flow
 */

import React, { Component } from 'react'
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-redux'
import store from './store'

// create function to be root node for app, wrap in/conect to redux Provider
const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

export default App;
