import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import authReducer from './auth'
import transactionReducer from './transaction'
import userReducer from './user'
import topUpReducer from './topUp'

const authConfig = {
  key: 'authReducer',
  storage,
  stateReconciler: hardSet
}

const transactionConfig = {
  key: 'transactionReducer',
  storage,
  stateReconciler: hardSet
}

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  transaction: persistReducer(transactionConfig, transactionReducer),
  user: userReducer,
  topUp: topUpReducer
})

export default reducer
