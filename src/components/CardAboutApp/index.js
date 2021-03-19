import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './index.css'
import AboutPhone from '../../assets/images/AboutPhone.png'
import AboutLock from '../../assets/images/AboutLock.png'
import AboutDownload from '../../assets/images/AboutDownload.png'

export default class CardAboutApp extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col lg={4}>
            <div className="CarAboutApp">
              <img src={AboutPhone} alt="PhoneIcon" />
              <div className="CarAboutAppTittle">24/7 Support</div>
              <div className="CarAboutAppDescrip">We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="CarAboutApp">
              <img src={AboutLock} alt="PhoneIcon" />
              <div className="CarAboutAppTittle">Data Privacy</div>
              <div className="CarAboutAppDescrip">We make sure your data is safe in our database and we will encrypt any data you submitted to us.</div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="CarAboutApp">
              <img src={AboutDownload} alt="PhoneIcon" />
              <div className="CarAboutAppTittle">Easy Download</div>
              <div className="CarAboutAppDescrip">Abusayap is 100% totally free to use it’s now available on Google Play Store and App Store.</div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
