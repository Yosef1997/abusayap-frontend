import React, { Component } from 'react'
import { Card, Form, Alert } from 'react-bootstrap'
import ButtonCustom from '../ButtonCustom'
import FormInputNumber from '../Form/FormInputNumber'
import { updateUser } from '../../redux/action/auth'
import { connect } from 'react-redux'

import './style.scss'
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(9, '*Phone number must have at least 9 characters')
    .max(15, '*Phone number cant be longer than 10 characters')
    .required('*Phone Number is required')
})

class AddPhoneNumber extends Component {
  state = {
    message: '',
    phoneNumber: this.props.auth.user.phoneNumber
  }
  phoneNumberPush = async (values) => {
    console.log(values)
    const { token, user } = this.props.auth
    await this.props.updateUser(
      token,
      user.id,
      {
        phoneNumber: values.phoneNumber
      }
    )
    if (this.props.auth.message) {
      this.setState({ message: this.props.auth.message, phoneNumber: this.props.auth.phoneNumber })
    } else {
      this.setState({ message: this.props.auth.errorMsg })
    }
    this.setState({ isLoading: false })
  }
  render () {
    return (
      <Card className="card-menu border-0 shadow-sm">
        <Card.Body>
          <p className="text-display-xs-bold-18">Add Phone Number</p>
          <p className="text-sm">Add at least one phone number for the transfer <br /> ID so you can start transfering your money to <br /> another user.</p>
          <div className="col-7 mx-auto">
            <Formik
              initialValues={{ phoneNumber: this.state.phoneNumber }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                this.phoneNumberPush(values)
              }}
            >
              {(
                {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                <Form onSubmit={handleSubmit}>
                  <FormInputNumber type="number" placeholder="Enter your phone number"
                    name='phoneNumber'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    isValid={touched.phoneNumber && !errors.phoneNumber}
                  />
                  {touched.phoneNumber && errors.phoneNumber
                    ? (<div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{errors.phoneNumber}</div>)
                    : null}
                  {this.state.message !== '' && <Alert variant="info">{this.state.message}</Alert>}
                  <ButtonCustom block type="submit">
                    Add Phone Number
                  </ButtonCustom>
                </Form>
              )}
            </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoneNumber)
