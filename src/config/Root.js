import React, { Component } from 'react'
import io from '../helper/socket'
import { connect } from 'react-redux'
import { amountTransaction, transactionHistoryNew } from '../redux/action/transaction'
import { detailUser, notification } from '../redux/action/user'

class Root extends Component {
  getAmountTransaction = async (token, idUser) => {
    await this.props.amountTransaction(token, idUser)
  }
  getTransactionHistory = async (token) => {
    await this.props.transactionHistoryNew(token)
  }
  getDetailUser = async (token, id) => {
    await this.props.detailUser(token, id)
  }
  componentDidMount () {
    const { token } = this.props.auth
    if (token) {
      const { id } = this.props.auth.user

      io.once(`Receive_Transaction_${id}`, msg => {
        console.log(msg)
        this.getAmountTransaction(token, id)
        this.getTransactionHistory(token)
        this.getDetailUser(token, id)
        this.props.notification(true)
      })
      io.once(`Update_Top_Up_${id}`, msg => {
        console.log(msg)
        this.getDetailUser(token, id)
      })
    }
  }
  render () {
    return <>{this.props.children}</>
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transaction: state.transaction
})

const mapDispatchToProps = { notification, detailUser, amountTransaction, transactionHistoryNew }

export default connect(mapStateToProps, mapDispatchToProps)(Root)
