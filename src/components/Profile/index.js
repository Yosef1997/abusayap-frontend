import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import defaultProfile from '../../assets/images/default-image.png'
import './Profile.scss'
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateUser, logout } from '../../redux/action/auth'
import { clearTransaction } from '../../redux/action/transaction'
const { REACT_APP_API_URL: API_URL } = process.env

class Profile extends Component {
  state = {
    isLoading: false,
    message: '',
    cangePicture: false
  }
  uploadImage = async (value) => {
    const FILE_SIZE = 500 * 1024
    const SUPPORTED_FORMATS = [
      'image/jpg',
      'image/jpeg',
      'image/gif',
      'image/png'
    ]
    const { token, user } = this.props.auth

    console.log(SUPPORTED_FORMATS.indexOf(value.type))
    if (FILE_SIZE < value.size) {
      console.log('File to large')
      await this.setState({ message: 'File to large' })
    } else if (SUPPORTED_FORMATS.indexOf(value.type) === -1) {
      console.log('File not compatibel')
      await this.setState({ message: 'File not compatibel' })
    } else {
      this.setState({ isLoading: true })
      await this.props.updateUser(token, user.id, { picture: (value) })
      await this.setState({ isLoading: false, message: 'Update profile succsefully', cangePicture: true })
    }
    await setTimeout(() => {
      this.setState({ message: '', cangePicture: false })
    }, 3000)
  }
  logout = () => {
    this.props.logout()
    this.props.clearTransaction()
    this.props.history.push('/login')
  }
  render () {
    const { isLoading } = this.state
    const { picture, firstname, lastname, phoneNumber } = this.props.auth.user
    return (
      <div className="card-profile">
        <img className="img-avatar"
          src={this.props.auth.user.picture ? `${API_URL}upload/profile/${picture}` : defaultProfile}
          alt="photo-profile" />
        {this.state.message && (
          <p className={this.state.cangePicture ? 'text-success' : 'text-error'}>{this.state.message}</p>
        )}
        <div className="change-profile">
          <label>
            <input type="file" onChange={(e) => this.uploadImage(e.target.files[0])} />
            <div className="edit-profile d-flex justify-content-center">
              {isLoading
                ? <Spinner animation="grow" size="sm" variant="success" />
                : <i className="fa fa-pencil-alt" />}
              <p>edit</p>
            </div>
          </label>
        </div>
        <h1>{firstname} {lastname}</h1>
        <p>+62 {phoneNumber}</p>
        <div className="menu-profile">
          <Link to="/home-page/profile/personal-info" className="card-menu-profile">
            <h2>Personal Info</h2>
            <i className="fa fa-arrow-right" />
          </Link>
          <Link to="/home-page/profile/change-password" className="card-menu-profile">
            <h2>Change Password</h2>
            <i className="fa fa-arrow-right" />
          </Link>
          <Link to="/home-page/profile/change-pin" className="card-menu-profile">
            <h2>Change Pin</h2>
            <i className="fa fa-arrow-right" />
          </Link>
          <button className="card-menu-profile" onClick={() => this.logout()}>
            <h2>Logout</h2>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (props) => ({
  auth: props.auth
})

const mapDispatchToProps = { updateUser, logout, clearTransaction }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
