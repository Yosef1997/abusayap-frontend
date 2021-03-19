import React, { Component } from 'react'
import { Card, Form, Alert, Spinner } from 'react-bootstrap'
import PinInput from 'react-pin-input'
import ButtonCustom from '../ButtonCustom'

import { connect } from 'react-redux'
import { updateUser } from '../../redux/action/auth'

class ChangePin extends Component {
  state = {
    pin: null,
    message: '',
    isLoading: false
  }
  changePin = (value) => {
    this.setState({
      pin: value
    })
  }
  submitData = async (event) => {
    event.preventDefault()
    const { token, user, message, errorMsg } = this.props.auth
    this.setState({
      isLoading: true
    })
    await this.props.updateUser(token, user.id, { pin: this.state.pin })
    if (message) {
      this.setState({
        isLoading: false,
        message
      })
    } else {
      this.setState({
        isLoading: false,
        message: errorMsg
      })
    }
  }
  render () {
    return (
      <Card className="card-menu border-0">
        <Card.Body>
          <p className="text-display-xs-bold-18">Change Pin</p>
          <p className="text-sm">Enter your current 6 digits Abusayap PIN below <br/> to continue to the next steps.</p>
          <div className="col-7 mx-auto">
          {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
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
                onComplete={(value, index) => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
                </div>
                {this.state.isLoading === false
                  ? <ButtonCustom block type="submit" >Continue</ButtonCustom>
                  : (<div className="text-center"><Spinner animation="border" variant="success" /></div>)}
            </Form>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { updateUser }

export default connect(mapStateToProps, mapDispatchToProps)(ChangePin)
