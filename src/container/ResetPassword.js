import React, { Component } from 'react'
import { Col, Row, Container, Form, Alert, Spinner } from 'react-bootstrap'
import ButtonCustom from '../components/ButtonCustom'
import LeftAuth from '../components/LeftAuth'
import FormInput from '../components/Form/FormInput'

import { connect } from 'react-redux'
import { forgotPassword } from '../redux/action/auth'

class ResetPassword extends Component {
  state = {
    email: '',
    message: '',
    isLoading: false
  }
  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  forgotPassword = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    await this.props.forgotPassword(this.state.email)
    if (this.props.auth.errorMsg === '') {
      this.setState({ message: this.props.auth.message })
    } else {
      this.setState({ message: this.props.auth.errorMsg })
    }
    this.setState({ isLoading: false })
  }
  render () {
    return (
      <Row className="container-fluid">
        <Col md={7} className="d-none d-md-block auth-img p-5">
          <LeftAuth/>
        </Col>
        <Col md={5} className="p-5">
          <Container>
            <p className="text-display-xs-bold">Did You Forgot Your Password?
Don’t Worry, You Can Reset Your
Password In a Minutes.</p>
            <p>
              To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
              {this.props.auth.message && this.state.message
                ? <Alert variant='success'>{this.props.auth.message}</Alert>
                : null}
              {this.props.auth.errorMsg && this.state.message
                ? <Alert variant='danger'>{this.props.auth.errorMsg}</Alert>
                : null}
            <Form onSubmit={this.forgotPassword}>
              <FormInput name="email" div="pt-3 pb-5" onChange={(event) => this.changeText(event)} group="inputWithIcon" type="email" placeholder="Enter your e-mail">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
              </FormInput>
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

const mapDispatchToProps = { forgotPassword }

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
