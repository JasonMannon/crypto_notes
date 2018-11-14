import Actions, { reducer, INITIAL_STATE } from '../note'

describe('createNote', () => {
  it('handles createNoteRequest', () => {
    const state = reducer(INITIAL_STATE, Actions.createNoteRequest('note'))

    expect(state.loading).toBeTruthy()
    expect(state.noteSaved).toBeFalsy()
    expect(state.errorMessage).toBe(null)
  })

  it('handles createNoteSuccess', () => {
    const state = reducer(INITIAL_STATE, Actions.createNoteSuccess())

    expect(state.loading).toBeFalsy()
    expect(state.noteSaved).toBeTruthy()
    expect(state.errorMessage).toBe(null)
  })


  it('handles createNoteError', () => {
    const state = reducer(INITIAL_STATE, Actions.createNoteError('error'))

    expect(state.loading).toBeFalsy()
    expect(state.errorMessage).toBe('error')
    expect(state.noteSaved).toBeFalsy()
  })
})
