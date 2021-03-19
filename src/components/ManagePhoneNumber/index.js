import React, { Component } from 'react'
import { Card, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/action/auth'
import { withRouter } from 'react-router-dom'
import './style.scss'

class ManagePhoneNumber extends Component {
  state = {
    message: ''
  }
  gotoAddNumberPhone = () => {
    this.props.history.push('/home-page/profile/personal-info/manage-phone-number/add-phone-number')
  }
  deletePhoneNumber = async () => {
    await this.props.updateUser(this.props.auth.token, this.props.auth.user.id, { phoneNumber: this.props.auth.user.phoneNumber })
    if (this.props.auth.message) {
      this.setState({ message: this.props.auth.message })
    } else {
      this.setState({ message: this.props.auth.errorMsg })
    }
  }
  render () {
    const { user } = this.props.auth
    return (
      <Card className="card-menu border-0 shadow-sm">
        <Card.Body>
          <p className="text-display-xs-bold-18">Manage Phone Number</p>
          <p className="text-sm">You can only delete the phone number and then <br/> you must add another phone number.</p>
          {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
          <Card className="card-menu border-0 shadow-sm pt-3">
            <Card.Body className="py-0">
              <div className="d-flex justify-content-between pt-3">
                <div onClick={() => this.gotoAddNumberPhone()} className="phone-div">
                  <p className="text-sm mb-1">Primary</p>
                  <p className="text-display-xs-bold-22">{user.phoneNumber || 'Input phoneNumber'}</p>
                </div>
                <div className="trash-number" onClick={() => this.deletePhoneNumber()}>
                  <i className="fa fa-trash fa-lg fa-fw d-flex justify-content-center align-items-center" aria-hidden="true"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { updateUser }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePhoneNumber))
