import React, { Component } from 'react'
import { Col, Row, Container, Form, Alert, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import LeftAuth from '../components/LeftAuth'
import PinInput from 'react-pin-input'

import { connect } from 'react-redux'
import { createPin } from '../redux/action/auth'

class CreatePin extends Component {
  state = {
    pin: null,
    message: '',
    isLoading: false
  }
  changePin = (value) => {
    this.setState({ pin: value })
  }
  submitData = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    await this.props.createPin(this.props.id, Number(this.state.pin))
    if (this.props.auth.errorMsg === '') {
      this.setState({ isLoading: false })
      this.props.history.push('/pin-success')
    } else {
      this.setState({ isLoading: false, message: this.props.auth.errorMsg })
    }
  }
  render () {
    return (
      <Row className="container-fluid">
        <Col md={7} className="d-none d-md-block auth-img p-5">
          <LeftAuth />
        </Col>
        <Col md={5} className="p-5">
          <Container>
            <p className="text-display-xs-bold">Secure Your Account, Your Wallet,
            and Your Data With 6 Digits PIN
That You Created Yourself.</p>
            <p>
              Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.</p>
              {this.state.message !== '' && <Alert variant="danger">{this.state.message}</Alert>}
            <Form onSubmit={this.submitData}>
              <div
                className="d-flex justify-content-center align-content-center pt-4 pb-5">
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
              {this.state.isLoading === false
                ? <ButtonCustom block type="submit" >Confirm</ButtonCustom>
                : (<div className="text-center"><Spinner animation="border" variant="success" /></div>)}
            </Form>
          </Container>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { createPin }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePin))
