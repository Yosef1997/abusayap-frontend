import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './index.css'
import LandingFeature from '../../assets/images/LandingFeatures.png'

export default class index extends Component {
  render () {
    return (
      <div className="FeatureLandingContainer pr-5 pl-5">
        <Container fluid>
          <Row>
            <Col>
              <img src={LandingFeature} alt="AppFeatures" />
            </Col>
            <Col className="FeatureLandingCol2">
              <div className="FeatureLandingHeader">
                All The
                <span>Great</span> <br />
                Abusayap Features.
              </div>

              <div className="FeatureLandingCard">
                <div className="FeatureLandingCardTitle"><span>1.</span>Small Fee</div>
                <div className="FeatureLandingCardDetail">We only charge 5% of every success transaction done in Abusayap app.</div>
              </div>
              <div className="FeatureLandingCard">
                <div className="FeatureLandingCardTitle"><span>2.</span>Data Secured</div>
                <div className="FeatureLandingCardDetail">All your data is secured properly in our system and it’s encrypted.</div>
              </div>
              <div className="FeatureLandingCard">
                <div className="FeatureLandingCardTitle"><span>3.</span>User Friendly</div>
                <div className="FeatureLandingCardDetail">Abusayap come up with modern and sleek design and not complicated.</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
