import { call, put } from 'redux-saga/effects'
import sagaHelper from 'redux-saga-testing'
import { signInUserRequest, createUserRequest, signOutUserRequest } from '../../sagas/userSagas'
import Actions from '../../reducers/user'

const api = {
  signInUser: jest.fn(),
  createUser: jest.fn(),
  signOutUser: jest.fn()
}

const email = 'email@test.com'
const password = 'password'
const passwordConfirmation = 'password'
const wrongPassword = 'wrong password'
const username = 'test'
const accessToken = 'authToken'
const client = 'client'
const signInUserRequestAction = Actions.signInUserRequest(email, password)
const createUserRequestAction = Actions.createUserRequest(email, username, password, passwordConfirmation)
const createUserFailureAction = Actions.createUserRequest(email, username, password, wrongPassword)
const signOutUserRequestAction = Actions.signOutUserRequest()

describe('userSaga', () => {

  describe('signInUser', () => {
    describe('signInUserRequest', () => {
      describe('successful request', () => {
        const userData = { uid: 'uid',
                           email: 'email',
                           accessToken: 'authToken',
                           username: 'test',
                           client: 'client' }
        const accessToken = 'authToken'
        const client = 'client'
        const successfulSignInResponse = {
          ok: true,
          headers: { 'access-token': accessToken, client },
          data: {
            data: {
              email: 'email',
              username: 'test',
              uid: 'uid',
            }
          }
        }
        const it = sagaHelper(signInUserRequest(api, signInUserRequestAction))

        it('should sign in via api', result => {
          expect(result).toEqual(call(api.signInUser, email, password))
          return successfulSignInResponse
        })

        it('should put sign in success action', result => {
          expect(result).toEqual(put(Actions.signInUserSuccess(userData)))
        })

        it('should end saga', result => expect(result).toBeUndefined())
      })

      describe('unsuccessful request', () => {
        const errorMessage = 'error 1'
        const unsuccessfulSignInResponse = {
          ok: false,
          data: {
            errors: ['error 1']
          }
        }
        const it = sagaHelper(signInUserRequest(api, signInUserRequestAction))

        it('should sign in via api', result => {
          expect(result).toEqual(call(api.signInUser, email, password))
          return unsuccessfulSignInResponse
        })

        it('should put sign in success action', result => {
          expect(result).toEqual(put(Actions.signInUserError(errorMessage)))
        })

        it('should end saga', result => expect(result).toBeUndefined())
      })
    })

  })

  describe('createUser', () => {
    describe('createUserRequest', () => {
      describe('successful request', () => {
        const userData = { uid: 'uid',
                           email: 'email',
                           accessToken: 'authToken',
                           username: 'test',
                           client: 'client' }
        const accessToken = 'authToken'
        const client = 'client'
        const successfulCreateUserResponse = {
          ok: true,
          headers: { 'access-token': accessToken, client },
          data: {
            data: {
              email: 'email',
              username: 'test',
              uid: 'uid',
            }
          }
        }
        const it = sagaHelper(createUserRequest(api, createUserRequestAction))

        it('should create user via api', result => {
          expect(result).toEqual(call(api.createUser, email, username, password, passwordConfirmation))
          return successfulCreateUserResponse
        })

        it('should put sign in success action', result => {
          expect(result).toEqual(put(Actions.createUserSuccess(userData)))
        })

        it('should end saga', result => expect(result).toBeUndefined())
      })

      describe('unsuccessful request', () => {
        const errorMessage = 'error 1'
        const unsuccessfulCreateUserResponse = {
          ok: false,
          data: {
            errors: {
              full_messages: ['error 1']
            }
          }
        }
        const it = sagaHelper(createUserRequest(api, createUserFailureAction))

        it('should create user via api', result => {
          expect(result).toEqual(call(api.createUser, email, username, password, wrongPassword))
          return unsuccessfulCreateUserResponse
        })

        it('should put sign in success action', result => {
          expect(result).toEqual(put(Actions.createUserError(errorMessage)))
        })

        it('should end saga', result => expect(result).toBeUndefined())
      })
    })
  })

  describe('signOutUser', () => {
    describe('signOutUserRequest', () => {
      describe('successful request', () => {
        const accessToken = 'authToken'
        const client = 'client'
        const successfulSignOutUserResponse = {
          ok: true
        }
        const it = sagaHelper(signOutUserRequest(api, signOutUserRequestAction))

        it('should sign out user via api', result => {
          expect(result).toEqual(call(api.signOutUser))
          return successfulSignOutUserResponse
        })

        it('should put sign out success action', result => {
          expect(result).toEqual(put(Actions.signOutUserSuccess()))
        })

        it('should end saga', result => expect(result).toBeUndefined())
      })
    })
  })

})
