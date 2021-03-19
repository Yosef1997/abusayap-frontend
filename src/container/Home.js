import React, { Component } from 'react'
import HomeMenu from '../components/HomeMenu'
import NavbarHome from '../components/NavbarHome'
import FooterHome from '../components/FooterHome'

export default class Home extends Component {
  render () {
    return (
      <div>
        <NavbarHome />
        <div className="bg-gray">
          <HomeMenu />
        </div>
        <FooterHome />
      </div>
    )
  }
}
