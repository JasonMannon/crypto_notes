import { call, put } from 'redux-saga/effects'
import Actions from '../reducers/note'
import { NavigationActions } from 'react-navigation'

export function* createNoteRequest (api, { note }) {
  console.log(note)
  const response = yield call(api.createNote, note)
  console.log(response)

  // if (response.ok) {
  //   yield put(Actions.createNoteSuccess())
  // } else {
  //
  // }
}
