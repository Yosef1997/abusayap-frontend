import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './index.css'

export default class index extends Component {
  render () {
    return (
      <div className="FooterHomeContainer">
        <Container fluid>
          <Row>
            <Col lg={7}>
              <div className="FooterHome">2020 Abusayap. All right reserved.</div>
            </Col>
            <Col>
              <div className="FooterHome">+62 5637 8882 9901</div>
            </Col>
            <Col>
              <div className="FooterHome">contact@Abusayap.com</div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
