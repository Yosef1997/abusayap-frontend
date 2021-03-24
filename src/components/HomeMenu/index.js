import React, { Component } from 'react'
import { Card, Col, Row, Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom'
import BalanceInfo from '../BalanceInfo'
import Contact from '../Contact'
import InputAmount from '../InputAmount'
import DetailTransaction from '../DetailTransfer'
import Result from '../ResultTransaction'
import TopUp from '../TopUp'
import Profile from '../Profile'
import PersonalInfo from '../PersonalInfo'
import CardTransHistory from '../CardTransHistory'
import ChangePassword from '../ChangePassword'
import TransactionHistory from '../TransactionHistory'
import './style.scss'
import ChangePin from '../ChangePin'
import AddPhoneNumber from '../AddPhoneNumber'
import ManagePhoneNumber from '../ManagePhoneNumber'
import TotalTransaction from '../TotalTransaction'
import { connect } from 'react-redux'
import { logout } from '../../redux/action/auth'
import { clearTransaction } from '../../redux/action/transaction'

class HomeMenu extends Component {
  logout = () => {
    this.props.logout()
    this.props.clearTransaction()
    this.props.history.push('/login')
  }
  render () {
    return (
      <Container className="py-3">
        <Router>
          <Row>
            <Col md={3} style={{ minHeight: '80vh' }}>
              <Card bg="light" className="card-menu pt-2 border-0 shadow-sm" id="sidebar" style={{ height: '100%', minHeight: '350px' }}>
                <ul>
                  <li>
                    <Link to="/home-page" className="text-menu">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/home-page/contact" className="text-menu">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                      </svg>
                      Transfer
                    </Link>
                  </li>
                  <li>
                    <Link to="/home-page/topup" className="text-menu">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                       Top Up
                    </Link>
                  </li>
                  <li>
                    <Link to="/home-page/profile" className="text-menu" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                      Profile
                    </Link>
                  </li>
                  {this.props.auth.user.role === 1 &&
                    <li>
                      <div className="text-menu logout" onClick={() => this.props.history.push('/Admin')} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4c4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                      Admin Panel
                    </div>
                    </li>
                  }
                  <li>
                    <div onClick={() => this.logout()} className="text-menu logout">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                      </svg>
                      Logout
                    </div>
                  </li>
                </ul>
              </Card>
            </Col>
            <Col>
              <Switch>
                <Route exact path="/home-page">
                  <BalanceInfo />
                  <Row className="pt-3">
                    <Col md={7}>
                      <TotalTransaction />
                    </Col>
                    <Col>
                      <CardTransHistory />
                    </Col>
                  </Row>
                </Route>
                <Route exact path="/home-page/contact">
                  <Contact />
                </Route>
                <Route exact path="/home-page/contact/input-amount">
                  <InputAmount />
                </Route>
                <Route exact path="/home-page/contact/input-amount/detail-transfer">
                  <DetailTransaction />
                </Route>
                <Route path="/home-page/contact/input-amount/detail-transfer/result-transaction">
                  <Result />
                </Route>
                <Route path="/home-page/topup">
                  <TopUp />
                </Route>
                <Route exact path="/home-page/profile">
                  <Profile />
                </Route>
                <Route exact path="/home-page/profile/personal-info">
                  <PersonalInfo />
                </Route>
                <Route path="/home-page/transaction-history">
                  <TransactionHistory />
                </Route>
                <Route path="/home-page/profile/change-password">
                  <ChangePassword />
                </Route>
                <Route path="/home-page/profile/change-pin">
                  <ChangePin />
                </Route>
                <Route exact path="/home-page/profile/personal-info/manage-phone-number">
                  <ManagePhoneNumber />
                </Route>
                <Route path="/home-page/profile/personal-info/manage-phone-number/add-phone-number">
                  <AddPhoneNumber />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { logout, clearTransaction }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeMenu))
