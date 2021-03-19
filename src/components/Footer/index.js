import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'
import LogoGreen from '../../assets/images/Logo.png'

export default class index extends Component {
  render () {
    return (
      <div className="FooterContainer">
        <Container fluid>
          <Row>
            <Col className="FooterCol1">
              <img src={LogoGreen} className="FooterAbusayap" />
              <div className="FooterDetail">Simplify financial needs and saving <br />
              much time in banking needs with <br />
              one single app.</div>
            </Col>
          </Row>
          <Row className="border-top pt-5">
            <Col lg={8}>
              <div className="FooterCopyRight">2021 Abusayap. All right reserved.</div>
            </Col>
            <Col lg>
              <div className="FooterCopyRight text-left">+62 5637 8882 9901</div>
            </Col>
            <Col lg>
              <div className="FooterCopyRight text-right">contact@Abusayap.com</div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
