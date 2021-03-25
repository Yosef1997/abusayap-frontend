import Route from '../src/config/Route'
import React, { Component } from 'react'
import Root from './config/Root'
import { Provider } from 'react-redux'
import persistedStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends Component {
  render () {
    const { store, persistor } = persistedStore()
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Root>
            <Route />
          </Root>
        </PersistGate>
      </Provider>
    )
  }
}
