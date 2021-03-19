import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './Jumbotron.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/Logo.png'
import AppDisplay from '../../assets/images/phone.png'

export default class index extends Component {
  render () {
    return (
      <Container fluid className="Hero">
        <Row className="HeroRow1">
          <Col lg={8}>
            <div>
              <img src={Logo} alt="LogoAbusayap" className="HeroAbusayap" />
            </div>
          </Col>
          <Col lg={4} className="text-center p-0">
            <Link to="/login"><Button variant="outline-light" className="HeroBtnLogin">Login</Button></Link>
            <Link to="/sign-up"><Button variant="light" className="HeroBtnSignUp">Sign Up</Button></Link>
          </Col>
        </Row>
        <Row>
          <Col className="HeroLeft">
            <div className="HeroAwesomeApp">
              Awesome App <br />For Saving Time.
            </div>
            <div className="HeroDescription">
              We bring you a mobile app for banking problems that <br />
              oftenly wasting much of your times.
            </div>
            <div>
              <Link to="/home-page"><Button variant="light" className="HeroBtnTry">Try it Free</Button></Link>
            </div>
          </Col>
          <Col>
            <div className="HeroAppDisplay">
              <img src={AppDisplay} className="img-fluid" alt="appDisplay" />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
