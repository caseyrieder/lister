import { combineReducers } from 'redux'
import * as recipesReducer from './recipes'

export default combineReducers({
  ...recipesReducer,
});
