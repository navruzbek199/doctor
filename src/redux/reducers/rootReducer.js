// ** Redux Imports
import { combineReducers } from 'redux'
// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import numberRouter from './number'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  numberRouter
})

export default rootReducer
