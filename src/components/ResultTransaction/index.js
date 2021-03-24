import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import './style.css'
import CardContact from '../CardContact'
import SuccessTransaction from '../SuccesTransaction/SuccesComponent'
import SuccessButton from '../SuccesTransaction/SuccesButton'
import Moment from 'react-moment'
import rupiah from '../../helper/rupiah'

class index extends Component {
  render () {
    return (
      <Container fluid className="ResultTransferContainer">
        <Row>
          <Col>
            <div>
              <SuccessTransaction />
            </div>

            <div className="DetailTransferCard mt-5">
              <div className="DetailTransferHeader">Amount</div>
              <div className="DetailTransferFill">Rp {rupiah(this.props.transaction.results.amount)}</div>
            </div>
            <div className="DetailTransferCard">
              <div className="DetailTransferHeader">Balance Left</div>
              <div className="DetailTransferFill">Rp {rupiah(this.props.transaction.results.balance)}</div>
            </div>
            <div className="DetailTransferCard">
              <div className="DetailTransferHeader">Date & Time</div>
              <div className="DetailTransferFill"><Moment format="MMMM DD, YYYY - hh:mm">{this.props.transaction.results.dateTransasction}</Moment></div>
            </div>
            <div className="DetailTransferCard">
              <div className="DetailTransferHeader">Notes</div>
              <div className="DetailTransferFill">{this.props.transaction.results.notes}</div>
            </div>
            <div className="DetailTransfer mt-4">Transfer To</div>
            <CardContact data={this.props.transaction.results.receiver[0]} />
            <div className="mt-5">
              <SuccessButton />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
})

export default connect(mapStateToProps)(index)
