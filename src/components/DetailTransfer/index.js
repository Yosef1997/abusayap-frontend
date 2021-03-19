import React, { Component } from 'react'
import './DetailTransfer.css'
import { Container, Row, Col, Button, Modal, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import CardContact from '../CardContact'
import ButtonCustom from '../ButtonCustom'
import PinInput from 'react-pin-input'
import moment from 'moment'
import { transfer } from '../../redux/action/transaction'
import { connect } from 'react-redux'
import Moment from 'react-moment'

class index extends Component {
  state = {
    show: false,
    pin: null,
    message: ''
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  changePin = (value) => {
    this.setState({ pin: value })
  }

  transfer = async () => {
    const { id, amount, note, status, dateTransaction } = this.props.transaction.confirmation
    await this.props.transfer(this.props.auth.token, id, amount, note, status, moment(dateTransaction).format('YYYY-MM-DD hh:mm:ss'), this.state.pin)
    if (this.props.transaction.errorMsg === '') {
      this.setState({ show: false })
      this.props.history.push('/home-page/contact/input-amount/detail-transfer/result-transaction')
    } else {
      this.setState({ show: false })
      this.setState({ message: this.props.transaction.errorMsg })
    }
  }

  render () {
    return (
      <Container fluid className="DetailTransferContainer">
        <Row>
          <Col>
            {this.state.message !== '' && <Alert variant="danger">{this.state.message}</Alert>}
            <div className="DetailTransfer">Transfer To</div>
            <CardContact data={this.props.transaction.confirmation} />
            <div className="DetailTransfer mb-3">Details</div>
            <div className="DetailTransferCard">
              <div className="DetailTransferHeader">Amount</div>
              <div className="DetailTransferFill">Rp. {this.props.transaction.confirmation.amount}</div>
            </div>
            <div className="DetailTransferCard">
              <div className="DetailTransferHeader">Balance Left</div>
              <div className="DetailTransferFill">Rp. {this.props.transaction.confirmation.amountBalance}</div>
            </div>
            <div className="DetailTransferCard">
              <div className="DetailTransferHeader">Date & Time</div>
              <div className="DetailTransferFill"><Moment format="MMMM DD, YYYY - hh:mm">{this.props.transaction.confirmation.dateTransaction}</Moment></div>
            </div>
            <div className="DetailTransferCard">
              <div className="DetailTransferHeader">Notes</div>
              <div className="DetailTransferFill">{this.props.transaction.confirmation.note}</div>
            </div>
            <div className="text-right my-4">
              <ButtonCustom onClick={this.handleShow} >Continue</ButtonCustom>
              <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter PIN to Transfer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  Enter your 6 digits PIN for confirmation <br />
                  to continue transferring money.
                </div>
                <div className="d-flex justify-content-center align-content-center pt-4 pb-5">
                  <PinInput
                    length={6}
                    initialValue=""
                    onChange={(value) => this.changePin(value)}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: '10px' }}
                    inputStyle={{ borderColor: '#9DA6B5', borderRadius: '10px' }}
                    inputFocusStyle={{ borderColor: '#00D16C' }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.transfer()}>
                  Continue
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction
})

const mapDispatchToProps = { transfer }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
