import http from '../../helper/http'
import qs from 'querystring'

export const getTopUpData = (token, cond) => {
  return async dispatch => {
    try {
      const query = cond
        ? qs.stringify({
          ...cond
        })
        : {}
      dispatch({
        type: 'ERRORMSG',
        payload: ''
      })
      const response = await http(token).get(`topUp?${cond ? query : ''}`)
      dispatch({
        type: 'TOP_UP',
        payload: {
          results: response.data.results,
          pageInfo: response.data.pageInfo
        }
      })
    } catch (err) {
      dispatch({
        type: 'ERRORMSG',
        payload: 'Cannot get top up data'
      })
    }
  }
}
export const updateTopUpStatus = (token, id, value) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('status', value)
    try {
      console.log(params, value)
      dispatch({
        type: 'ERRORMSG',
        payload: ''
      })
      const response = await http(token).patch(`topup/${id}`, params)
      dispatch({
        type: 'UPDATE_TOP_UP',
        payload: [response.data.results]
      })
    } catch (err) {
      // const { message } = err.response.data
      console.log(err)
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: 'Update Top U Failed'
      })
    }
  }
}
export const createTopUp = (token, data) => {
  return async dispatch => {
    try {
      const form = new FormData()
      console.log(data)
      Object.keys(data).forEach(key => {
        form.append(key, data[key])
      })
      dispatch({
        type: 'ERRORMSG',
        payload: ''
      })
      const response = await http(token).post('topup', form)
      console.log(response)
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: 'ERRORMSG',
        payload: 'Creted top up failed'
      })
    }
  }
}
