import React, { Component } from 'react'
import NavbarHome from '../components/NavbarHome'
import FooterHome from '../components/FooterHome'
import AdminMenu from '../components/AdminPage'

export default class Admin extends Component {
  render () {
    return (
      <div>
        <NavbarHome />
        <div className="bg-gray">
          <AdminMenu />
        </div>
        <FooterHome />
      </div>

    )
  }
}
