const initialState = {
  results: null,
  pageInfo: null,
  errorMsg: ''
}

const topUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOP_UP': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'UPDATE_TOP_UP': {
      const newResult = state.results.map(obj => action.payload.find(
        item => item.id === obj.id) || obj)
      return {
        ...state,
        results: newResult
      }
    }
    case 'ERRORMSG': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default topUpReducer
