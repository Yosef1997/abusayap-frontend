import http from '../../helper/http'

export const detailUser = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: ''
      })
      const response = await http(token).get(`user/${id}`)
      dispatch({
        type: 'DETAIL_USER',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message
      })
    }
  }
}

export const contact = (token, search, limit, page, sort, order) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: ''
      })
      const response = await http(token).get(`contact?search=${search !== undefined ? search : ''}&limit=${limit !== undefined ? limit : 4}&page=${page !== undefined ? page : 1}&sort=${sort !== undefined ? sort : 'id'}&order=${order !== undefined ? order : 'ASC'}`)
      dispatch({
        type: 'CONTACT',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message
      })
    }
  }
}

export const editUserInfo = (token, id, firstname, lastname, email) => {
  return async dispatch => {
    try {
      const data = new URLSearchParams()
      data.append('firstname', firstname)
      data.append('lastname', lastname)
      // data.append('balance', balance)
      data.append('email', email)
      const response = await http(token).patch(`user/${id}`, data)
      dispatch({
        type: 'EDIT_USER_INFO',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_USER_INFO_MESSAGE',
        payload: message
      })
    }
  }
}

export const notification = (value) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'NOTIFICATION',
        payload: value
      })
    } catch (err) {
      dispatch({
        type: 'SET_USER_INFO_MESSAGE',
        payload: 'errpr'
      })
    }
  }
}
