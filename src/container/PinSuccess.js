import React, { Component } from 'react'
import { Col, Row, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import LeftAuth from '../components/LeftAuth'
import successLogo from '../assets/icons/success.png'

import { connect } from 'react-redux'

class PinSuccess extends Component {
  render () {
    return (
      <Row className="container-fluid">
        <Col md={7} className="d-none d-md-block auth-img p-5">
          <LeftAuth/>
        </Col>
        <Col md={5} className="p-5">
          <Container>
            <Image src={successLogo} width={70}/>
            <p className="text-display-xs-bold py-4">{this.props.auth.message}</p>
            <p className="pb-5">
              Your PIN was successfully created and you can now access all the features in Abusayap. Login to your new account and start exploring!</p>

            <Link to='/login'>
              <ButtonCustom block >
                  Login Now
              </ButtonCustom>
            </Link>
          </Container>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PinSuccess)
