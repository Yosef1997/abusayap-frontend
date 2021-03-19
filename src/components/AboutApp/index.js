import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './AboutApp.css'
import CardAboutApp from '../CardAboutApp/index'

export default class index extends Component {
  render () {
    return (
      <div>
        <Container fluid className="AboutAppContainer">
          <Row>
            <Col>
              <div className="AboutAppHeader">
                <span>About</span>
                the Application.
              </div>
              <div className="AboutAppDetail">
                We have some great features from the application and it’s totally free <br />to use by all users around the world.
              </div>
            </Col>
          </Row>
          <Row>
            <CardAboutApp />
          </Row>
        </Container>
      </div>
    )
  }
}
