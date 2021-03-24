import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, role, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (role === 'ADMIN') {
        if (auth.token && auth.user.role === 1) {
          return <Component {...props} />
        } else {
          return <Redirect to='/home-page' />
        }
      } else {
        if (auth.token) {
          return <Component {...props} />
        } else {
          return <Redirect to='/login' />
        }
      }
    }} />
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
