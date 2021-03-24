import React, { Component } from 'react'
import './index.css'
import FormInputAmount from '../Form/FormInputAmount'
import { Container, Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import rupiah from '../../helper/rupiah'
import { connect } from 'react-redux'
import { createTopUp } from '../../redux/action/topUp'
import moment from 'moment'

class topup extends Component {
  state = {
    show: false,
    isMessage: false
  }
  amountValidation (values) {
    const FILE_SIZE = 500 * 1024
    const SUPPORTED_FORMATS = [
      'image/jpg',
      'image/jpeg',
      'image/gif',
      'image/png'
    ]
    const errors = {}
    const amount = Number(values.amount.replace(/[^0-9]/g, ''))
    const picture = values.picture

    if (!amount) {
      errors.amount = 'Amount Required'
    } else if (amount < 5000) {
      errors.amount = 'Minimun Transfer Rp. 5000'
    }

    if (!picture) {
      errors.picture = 'Picture required'
    } else if (FILE_SIZE < picture.size) {
      errors.picture = 'File to large'
    } else if (SUPPORTED_FORMATS.indexOf(picture.type) === -1) {
      errors.picture = 'File not compatibel'
    }

    return errors
  }
  handelModal = () => {
    this.setState({ show: !this.state.show })
  }
  pushTopUp = async (values) => {
    const { token } = this.props.auth
    const dateTransaction = new Date()
    const amount = Number(values.amount.replace(/[^0-9]/g, ''))
    this.setState({ isMessage: false })
    await this.props.createTopUp(token, {
      amount: amount,
      picture: values.picture,
      dateTransaction: moment(dateTransaction).format('YYYY-MM-DD hh:mm:ss')
    })
    this.setState({ isMessage: true })
    setTimeout(() => {
      this.setState({ isMessage: false })
    }, 2000)
  }
  render () {
    return (
      <>
        <Modal show={this.state.show} onHide={() => this.handelModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Top Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ amount: '', picture: '' }}
              validate={(values) => this.amountValidation(values)}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                this.pushTopUp(values)
                resetForm()
                setSubmitting(false)
              }}
            >
              {({
                values,
                errors,
                errorMessage,
                touched,
                setFieldValue,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <>
                  <Form className="my-3" onSubmit={handleSubmit}>
                    <p className="title">Input Amount</p>

                    <FormInputAmount type="text" placeholder="0.00"
                      group={`amountIcon ${errors.amount ? 'error' : null}`}
                      name='amount'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount === '' || values.amount === 'Rp. ' ? '' : `Rp. ${rupiah(values.amount)}`}
                    />
                    <ErrorMessage name="amount" component="div" className='error-text' />
                    <p className="title">Input Picture</p>
                    <input id="picture" name="picture" type="file" onChange={(event) => {
                      setFieldValue('picture', event.currentTarget.files[0])
                    }} className="form-control" onBlur={handleBlur} />
                    {errors.picture && touched.picture ? <p className='error-text'>{errors.picture}</p> : null}
                    {this.state.isMessage && <Alert variant='success'>Transaction success, please wait</Alert>}
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => this.handelModal()}>
                        Close
                    </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                     </Button>
                    </Modal.Footer>
                  </Form>

                </>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
        <div className="TopUpContainer">
          <Container>
            <Row>
              <Col>
                <div className="topup-wrapper d-flex flex-row">
                  <div className="buttonTopUp d-flex flex-row"
                    onClick={() => this.handelModal()}
                  >+</div>
                  <div>
                    <p className="bank">BCA - Abusayap</p>
                    <p className="nobank">2389 081393877946</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="TopUpTitle">How To Top Up</div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>1</span>
                  Go to the nearest ATM or you can use E-Banking.
                </div>
                </div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>2</span>
                  Type your security number on the ATM or E-Banking.
                </div>
                </div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>3</span>
                  Select “Transfer” in the menu
                </div>
                </div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>4</span>
                  Type the virtual account number that we provide you at the top.
                </div>
                </div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>5</span>
                  Type the amount of the money you want to top up.
                </div>
                </div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>6</span>
                  Read the summary details
                </div>
                </div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>7</span>
                  Press transfer / top up
                </div>
                </div>
                <div className="TopUpCard">
                  <div className="TopUpList">
                    <span>8</span>
                  You can see your money in Abusayap within 3 hours.
                </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div >
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  topUp: state.topUp
})
const mapDispatchToProps = { createTopUp }

export default connect(mapStateToProps, mapDispatchToProps)(topup)
