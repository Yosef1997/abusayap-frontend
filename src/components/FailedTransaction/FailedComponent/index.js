import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css'
import FailedIconTransaction from '../../../assets/icons/failed.png'

export default class index extends Component {
  render () {
    return (
      <Container fluid>
        <Row>
          <Col>
            <div className="text-center">
              <img src={FailedIconTransaction} alt="Transaction Failed" />
            </div>
            <div className="ResultFailed">Transfer Failed</div>
            <div className="ResultFailedDetail">
              We can’t transfer your money at the moment, we recommend you to check your <br />
              internet connection and try again.
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
