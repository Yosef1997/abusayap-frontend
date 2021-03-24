import http from '../../helper/http'
import qs from 'querystring'

export const transfer = (token, idReceiver, amount, notes, status, dateTransaction, pin) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('idReceiver', idReceiver)
    params.append('amount', amount)
    params.append('notes', notes)
    params.append('status', status)
    params.append('dateTransaction', dateTransaction)
    params.append('pin', pin)
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: ''
      })
      const results = await http(token).post('transaction/', params)
      dispatch({
        type: 'TRANSFER',
        payload: results.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message
      })
    }
  }
}

export const detailTransaction = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: ''
      })
      const response = await http(token).get(`transaction/${id}`)
      dispatch({
        type: 'DETAIL_TRANSACTION',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message
      })
    }
  }
}

export const amountTransaction = (token, idUser) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: ''
      })
      const response = await http(token).get(`transaction/amountTransaction/${idUser}`)
      dispatch({
        type: 'AMOUNT_TRANSACTION',
        payload: response.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message
      })
    }
  }
}

export const transactionHistory = (token, search, limit, page, sort, order) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: ''
      })
      const response = await http(token).get(`transaction/history?search=${search !== undefined ? search : ''}&limit=${limit !== undefined ? limit : 4}&page=${page !== undefined ? page : 1}&sort=${sort !== undefined ? sort : 'id'}&order=${order !== undefined ? order : 'ASC'}`)
      dispatch({
        type: 'TRANSACTION_HISTORY',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message
      })
    }
  }
}

export const transactionHistoryNew = (token, cond) => {
  return async dispatch => {
    try {
      const query = cond
        ? qs.stringify({
          ...cond
        })
        : {}
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: ''
      })
      const response = await http(token).get(`transaction/history?${cond ? query : ''}`)
      dispatch({
        type: 'TRANSACTION_HISTORY',
        payload: response.data.results,
        pageInfo: response.data.pageInfo
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message
      })
    }
  }
}

export const selectReceiver = (receiver) => ({
  type: 'SELECT_RECEIVER',
  payload: receiver
})

export const confirmation = (value) => ({
  type: 'CONFIRMATION',
  payload: value
})

export const clearTransaction = () => ({
  type: 'CLEAR_TRANSACTION'
})
