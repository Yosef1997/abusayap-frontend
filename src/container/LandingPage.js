import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron/index'
import Partner from '../components/Partner/Partner'
import AboutApp from '../components/AboutApp/index'
import Features from '../components/FeaturesInfo/index'
import Testimoni from '../components/Testimoni/index'
import Footer from '../components/Footer/index'

export default class LandingPage extends Component {
  render () {
    return (
      <div>
        <Jumbotron />
        <Partner />
        <AboutApp />
        <Features />
        <Testimoni />
        <Footer />
      </div>
    )
  }
}
