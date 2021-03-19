import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './index.css'
import Carousel from '../Carousel/index'

export default class index extends Component {
  render () {
    return (
      <div className="TestimoniContainer">
        <Container fluid>
          <Row>
            <Col>
              <div className="TestimoniUserSaying">
                What Users are <span>Saying.</span>
              </div>
              <div className="TestimoniUserDetail">
                We have some great features from the application and it’s totally free <br />
                to use by all users around the world.
              </div>
            </Col>
          </Row>
          <Row>
            <Carousel />
          </Row>
        </Container>
      </div>
    )
  }
}
