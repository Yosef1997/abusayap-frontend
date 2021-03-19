import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css'
import SuccessIconTransaction from '../../../assets/icons/success.png'

export default class index extends Component {
  render () {
    return (
      <Container fluid>
        <Row>
          <Col>
            <div className="text-center">
              <img src={SuccessIconTransaction} alt="Transaction Failed" />
            </div>
            <div className="ResultFailed">Transfer Success</div>
          </Col>
        </Row>
      </Container>
    )
  }
}
