import React, { Component } from 'react'
import './index.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { detailUser } from '../../redux/action/user'

class index extends Component {
  async componentDidMount () {
    await this.props.detailUser(this.props.auth.token, this.props.auth.user.id)
  }
  render () {
    return (
      <Container className="BalanceInfoCard shadow-sm">
        <Row className="w-100 h-100">
          <Col lg={9} className="BalanceInfoCol">
            <div className="BalanceInfoHeader" style={{ fontWeight: 700, color: 'white' }}>Balance</div>
            <div className="BalanceInfoAmount">{this.props.user.results ? `Rp. ${this.props.user.results.balance}` : 'Rp. 0'}</div>
            <div className="BalanceInfoPhone" style={{ fontWeight: 700, color: 'white' }}>+62 {this.props.auth.user.phoneNumber !== null ? this.props.auth.user.phoneNumber : 'No PhoneNumber'}</div>
          </Col>
          <Col className="BalanceInfoCol">
            <Link to="/home-page/contact" className="BalanceBtnTransfer">
              <svg className="mr-2" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 22.1663V5.83301" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.83331 13.9997L14 5.83301L22.1666 13.9997" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

                  Transfer
                </Link>
            <Link to="/home-page/topup" className="BalanceBtnTransfer">
              <svg className="mr-2" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5.83301V22.1663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.83331 14H22.1666" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

                  Top Up
                </Link>
          </Col>
        </Row>
      </Container>

    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

const mapDispatchToProps = { detailUser }

export default connect(mapStateToProps, mapDispatchToProps)(index)
