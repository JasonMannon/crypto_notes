import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  createUserRequest: ['email', 'username', 'password', 'passwordConfirmation'],
  createUserSuccess: ['userData'],
  createUserError: ['errorMessage'],
  signInUserRequest: ['email', 'password'],
  signInUserSuccess: ['userData'],
  signInUserError: ['errorMessage'],
  signOutUserRequest: null,
  signOutUserSuccess: null
})

export { Types }
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  userLoggedIn: false,
  userData: {}
})

export const getInitialState = () => INITIAL_STATE.merge({s
})

export const createUserRequest = (state) => state.merge({ loading: true, errorMessage: null })
export const createUserSuccess = (state, { userData }) =>
  state.merge({ loading: false, userLoggedIn: true, userData })
export const createUserError = (state, { errorMessage }) => state.merge({
  errorMessage,
  loading: false
})

export const signInUserRequest = (state) => state.merge({ loading: true, errorMessage: null })
export const signInUserSuccess = (state, { userData }) =>
  state.merge({ userLoggedOut: false, userLoggedIn: true, loading: false, userData })
export const signInUserError = (state, { errorMessage }) => state.merge({
  errorMessage,
  loading: false
})

export const signOutUserRequest = (state) => state.merge({ loading: true })
export const signOutUserSuccess = (state) => state.merge({ loading: false, userLoggedIn: false, userLoggedOut: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_USER_REQUEST]: createUserRequest,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_ERROR]: createUserError,
  [Types.SIGN_IN_USER_REQUEST]: signInUserRequest,
  [Types.SIGN_IN_USER_SUCCESS]: signInUserSuccess,
  [Types.SIGN_IN_USER_ERROR]: signInUserError,
  [Types.SIGN_OUT_USER_REQUEST]: signOutUserRequest,
  [Types.SIGN_OUT_USER_SUCCESS]: signOutUserSuccess
})
