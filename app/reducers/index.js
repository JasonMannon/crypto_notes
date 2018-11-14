import { combineReducers } from 'redux'

export default combineReducers({
  user: require('./user').reducer,
  note: require('./note').reducer
})
