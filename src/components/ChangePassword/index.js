import React, { Component } from 'react'
import { Card, Form, Alert, Spinner } from 'react-bootstrap'
import ButtonCustom from '../ButtonCustom'
import FormInput from '../Form/FormInput'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/action/auth'

class ChangePassword extends Component {
  state = {
    isLoading: false,
    isMessage: false
  }

  passwordValidation (values) {
    const errors = {}
    const { password, newPassword, validNewPassword } = values

    if (!password) {
      errors.msg = 'Current Password Required'
    } else if (!newPassword) {
      errors.msg = 'New Password Required'
    } else if (!validNewPassword) {
      errors.msg = 'Repeat your new password'
    } else if (password.length < 8 || newPassword.length < 8 || validNewPassword.length < 8) {
      errors.msg = 'Password have at least 8 characters'
    } else if (password === newPassword) {
      errors.msg = 'Cant same with current password'
    } else if (newPassword !== validNewPassword) {
      errors.msg = 'New password & repeat password not same'
    }
    return errors
  }

  passwordPush = async (values) => {
    this.setState({ isLoading: true })
    const { token, user } = this.props.auth
    console.log(user)
    await this.props.updateUser(
      token,
      user.id,
      {
        password: values.password,
        newPassword: values.newPassword
      }
    )
    setTimeout(() => {
      this.setState({ isLoading: false, isMessage: true })
    }, 1000)
    setTimeout(() => {
      this.setState({ isMessage: false })
    }, 5000)
  }
  render () {
    return (
      <Card className="card-menu border-0">
        <Card.Body>
          <p className="text-display-xs-bold-18">Change Password</p>
          <p className="text-sm">You must enter your current password and then <br /> type your new password twice.</p>
          <div className="col-7 mx-auto">
            <Formik
              initialValues={{ password: '', newPassword: '', validNewPassword: '' }}
              validate={(values) => this.passwordValidation(values)}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                setTimeout(() => {
                  this.passwordPush(values)
                  resetForm()
                  setSubmitting(false)
                }, 500)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormInput div="py-3" group="inputWithIcon" type="password" placeholder="Enter your password"
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                      <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </FormInput>
                  <FormInput group="inputWithIcon" type="password" placeholder="Enter your new password"
                    name='newPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                      <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </FormInput>
                  <FormInput div="pt-3 pb-5" group="inputWithIcon" type="password" placeholder="Enter your new password"
                    name='validNewPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.validNewPassword}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                      <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </FormInput>
                  {(touched.password && touched.newPassword && touched.validNewPassword) && errors.msg
                    ? <Alert variant='danger'>{errors.msg}</Alert>
                    : null}
                  {this.props.auth.message && this.state.isMessage
                    ? <Alert variant='success'>{this.props.auth.message}</Alert>
                    : null}
                  {this.props.auth.errorMsg && this.state.isMessage
                    ? <Alert variant='danger'>{this.props.auth.errorMsg}</Alert>
                    : null}
                  { this.state.isLoading && !this.state.isMessage
                    ? (<div className="text-center"><Spinner animation="border" variant="success" style={{ marginRight: 'auto' }} /></div>)
                    : null
                  }
                  <ButtonCustom block type="submit" disabled={values.password === '' || values.newPassword === '' || values.validNewPassword === '' || errors.msg}>
                    Reset Password
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

const mapStateToProps = (props) => ({
  auth: props.auth
})

const mapDispatchToProps = { updateUser }

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
