import React, { Component } from 'react'
import { Card, Image } from 'react-bootstrap'
import listTransfer from '../../utils/listTransfer'
import listSubscription from '../../utils/listSubscription'
import ArrowUp from '../../assets/icons/arrow-up.png'
import ArrowDown from '../../assets/icons/arrow-down.png'
import { connect } from 'react-redux'
import { transactionHistoryNew } from '../../redux/action/transaction'
import rupiah from '../../helper/rupiah'
import './style.scss'

class CardNotif extends Component {
  state = {
    listTransfer,
    listSubscription
  }
  async componentDidMount () {
    await this.props.transactionHistoryNew(this.props.auth.token)
  }
  render () {
    return (
      <Card className="card-notif border-0">
        <Card.Body id="scrollmenu">
          {this.props.transaction.transactionHistory
            ? this.props.transaction.transactionHistory.map((item) => {
              return (
                <div key={item.id} className="pb-2">
                  <div className="shadow-sm border-0 card-in-notif">
                    <div className="d-flex p-3">
                      {item.userAs === 'sender'
                        ? <Image src={ArrowDown} height={28} />
                        : <Image src={ArrowUp} height={28} />
                      }

                      <div className="ml-3">
                        <p className="text-xs m-0">Transfer {item.userAs === 'sender' ? 'to' : 'from'} {item.name}</p>
                        <p className="text-display-xs-bold-18 m-0">
                          {item.userAs === 'sender' ? '-' : '+'}Rp {rupiah(item.amount)}
                        </p>
                      </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardNotif)
