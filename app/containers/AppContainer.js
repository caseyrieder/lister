import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux' // this takes in state & actions & wraps the component we give it
import { ActionCreators } from '../actions'
import Home from './Home'

class AppContainer extends Component {
  render() {
    return <Home {...this.props} />
  }
}

// takes in dispatch arg to dispatch all actions to entire application
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// in connect, 1st arg is a fxn to manipulate the store `() => return{}`, 2nd is propsMapper
// So this does no manipulation, but does wirre all the actions to the props in every component
// (state) is global state of app. by choosing state.recipeCount, we just grab the recipeCount portion of state
export default connect(() => { return {} }, mapDispatchToProps)(AppContainer);
