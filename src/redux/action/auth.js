import http from '../../helper/http'
import jwt from 'jwt-decode'

export const login = (email, password) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('auth/login', params)
      const token = results.data.results.token
      const user = jwt(token)
      dispatch({
        type: 'LOGIN',
        payload: token,
        user: user
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const signUp = (username, email, password) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('email', email)
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('auth/sign-up', params)
      dispatch({
        type: 'SIGN_UP',
        payload: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const createPin = (id, pin) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('pin', pin)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().patch(`auth/pin/${id}`, params)
      dispatch({
        type: 'CREATE_PIN',
        payload: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const forgotPassword = (email) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('email', email)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('auth/forgotPassword', params)
      dispatch({
        type: 'FORGOT_PASSWORD',
        payload: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const resetPassword = (token, password) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().patch(`auth/resetPassword/${token}`, params)
      dispatch({
        type: 'RESET_PASSWORD',
        payload: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const updateUser = (token, id, data) => {
  return async dispatch => {
    const params = new FormData()
    if (data.pin) {
      params.append('pin', data.pin)
    }
    if (data.password) {
      params.append('password', data.password)
    }
    if (data.newPassword) {
      params.append('newPassword', data.newPassword)
    }
    if (data.firstname) {
      params.append('firstname', data.firstname)
    }
    if (data.lastname) {
      params.append('lastname', data.lastname)
    }
    if (data.balance) {
      params.append('balance', data.balance)
    }
    if (data.email) {
      params.append('email', data.email)
    }
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber)
    }
    if (data.picture) {
      params.append('picture', data.picture)
    }
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      dispatch({
        type: 'UPDATE_USER',
        message: ''
      })
      const results = await http(token).patch(`user/${id}`, params)
      dispatch({
        type: 'UPDATE_USER',
        payload: results.data.results,
        message: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})
