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
        payload: 'ss'
      })
    }
  }
}
