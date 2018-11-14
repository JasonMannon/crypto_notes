import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  createNoteRequest: ['note'],
  createNoteSuccess: null,
  createNoteError: ['errorMessage']
})

export { Types }
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  noteSaved: false
})

export const getInitialState = () => INITIAL_STATE.merge({s
})

export const createNoteRequest = (state) => state.merge({ loading: true, noteSaved: false, errorMessage: null })
export const createNoteSuccess = (state) => state.merge({ loading: false, noteSaved: true, errorMessage: null })
export const createNoteError = (state, { errorMessage }) => state.merge({ loading: false, noteSaved: false, errorMessage })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_NOTE_REQUEST]: createNoteRequest,
  [Types.CREATE_NOTE_SUCCESS]: createNoteSuccess,
  [Types.CREATE_NOTE_ERROR]: createNoteError
})
