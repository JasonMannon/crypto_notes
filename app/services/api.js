import apisauce from 'apisauce'
import { AsyncStorage } from 'react-native'
import { ENV } from '../../environment'

const create = (dispatch) => {

  const api = apisauce.create({
    baseURL: `${ENV.apiUrl}/api/v1`
  })

  const setAuthHeaders = ({ accessToken, client, uid }) =>
    api.setHeaders({
      'access-token': accessToken,
      'token-type': 'Bearer',
      client,
      uid,
      'Content-Type': 'application/json'
    })

    api.addMonitor(response => {
      const { 'access-token': accessToken, client, uid } = response.headers
      if (accessToken) {
        setAuthHeaders({ accessToken, client, uid })
      }
    })

    api.addMonitor(response => {
      if (!response.ok && response.status === 401) {
        console.log(response.data.errors[0])
        if (response.data.errors[0] === 'Authorized users only.') {
          console.log('here')

        }
        console.log('bad request')
      }
    })

  try {
    AsyncStorage.getItem('user').then(
      (value) => {
        const userData = JSON.parse(value)

        if (userData && userData.uid) {
          setAuthHeaders(userData)
        }
      }
    )
  } catch (error) {
    console.log('error')
  }

  const signInUser = (email, password) => api.post('/auth/sign_in', { email, password })

  const createUser = (email, username, password, passwordConfirmation) =>
    api.post('/auth', { email, username, password, password_confirmation: passwordConfirmation })

  const signOutUser = () => api.delete('/auth/sign_out')

  return {
    createUser,
    signInUser,
    signOutUser
  }
}

export default { create }
