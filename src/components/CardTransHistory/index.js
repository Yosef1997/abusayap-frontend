import React, { Component } from 'react'
import { Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultProfile from '../../assets/images/default-image.png'
import rupiah from '../../helper/rupiah'
import { connect } from 'react-redux'
import { transactionHistoryNew } from '../../redux/action/transaction'

import './style.scss'

class CardTransHistory extends Component {
  async componentDidMount () {
    await this.props.transactionHistoryNew(this.props.auth.token)
    await console.log(this.props.transaction.transactionHistory)
  }
  render () {
    return (
      <Card className="card-menu border-0 shadow-sm" style={{ height: '100%' }}>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <p className="text-display-xs-bold-18">Transaction History</p>
            <Link to="/home-page/transaction-history" className="text-display-xs-bold-16">see all</Link>
          </div>
          {this.props.transaction.transactionHistory
            ? this.props.transaction.transactionHistory.map((item) => {
              return (
                <div key={item.id}>
                  <div className="d-flex justify-content-between pt-3">
                    <div className="d-flex justify-content-center align-content-center">
                      <Image src={item.picture ? `http://localhost:5000/upload/profile/${item.picture}` : defaultProfile} className="img-avatar mr-3" />
                      <div>
                        <p className="text-display-xs-bold-16 mb-2">{item.name}</p>
                        <p className="text-link-xs text-color-label">{item.status}</p>
                      </div>
                    </div>
                    <p className={`text-right ${item.userAs === 'sender' ? 'text-danger' : 'text-primary'} text-display-xs-bold-16`}>
                      {item.userAs === 'sender' ? '-' : '+'}Rp {rupiah(item.amount)}
                    </p>
                  </div>
                </div>
              )
            })
            : (<div>No Transaction</div>)}
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction
})

const mapDispatchToProps = { transactionHistoryNew }

export default connect(mapStateToProps, mapDispatchToProps)(CardTransHistory)
