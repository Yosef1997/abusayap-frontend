import React, { Component } from 'react'
import { Navbar, Nav, Image, Container, DropdownButton } from 'react-bootstrap'
import logo from '../../assets/images/abusayap_primary_logo.png'
import defaultProfile from '../../assets/images/default-image.png'
import bell from '../../assets/icons/bell.png'
import CardNotif from '../CardNotif'
import { connect } from 'react-redux'

import './NavbarHome.scss'

class NavbarHome extends Component {
  render () {
    return (
      <Navbar className="nav-home">
        <Container>
          <Navbar.Brand>
          <Image src={logo} height={40} />
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link>
            <Image
              src={this.props.auth.user.picture ? `http://localhost:8080/upload/profile/${this.props.auth.user.picture}` : defaultProfile}
              height={52}
              className="img-avatar"
            />
          </Nav.Link>
          <Nav.Link>
            <p className="m-0 text-phone-small">{`${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`}</p>
            <p className="m-0">{this.props.auth.user.phoneNumber !== null ? `+62 ${this.props.auth.user.phoneNumber}` : 'No PhoneNumber'}</p>
          </Nav.Link>
          <DropdownButton
            menuAlign="right"
            title={<Image src={bell} height={24} />}
            variant="transparent"
            className="pt-3"
          >
            <CardNotif />
          </DropdownButton>
        </Nav>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(NavbarHome)
