import { all, takeLatest } from 'redux-saga/effects'
import API from '../services/api'

import { Types as UserTypes } from '../reducers/user'
import { Types as NoteTypes } from '../reducers/note'

import { signInUserRequest, createUserRequest, signOutUserRequest } from '../sagas/userSagas'
import { createNoteRequest } from '../sagas/noteSagas'

export default function * root (dispatch) {
  const api = API.create(dispatch)

  yield all([
    takeLatest(NoteTypes.CREATE_NOTE_REQUEST, createNoteRequest, api),

    takeLatest(UserTypes.CREATE_USER_REQUEST, createUserRequest, api),
    takeLatest(UserTypes.SIGN_IN_USER_REQUEST, signInUserRequest, api),
    takeLatest(UserTypes.SIGN_OUT_USER_REQUEST, signOutUserRequest, api)
  ])
}
