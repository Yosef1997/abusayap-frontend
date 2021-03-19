import React, { Component } from 'react'
import { Card, Image, Button, Form, Spinner } from 'react-bootstrap'
import FormSearch from '../Form/FormSearch'
import defaultProfile from '../../assets/images/default-image.png'

import { connect } from 'react-redux'
import { transactionHistory } from '../../redux/action/transaction'

class TransactionHistory extends Component {
  state = {
    search: '',
    limit: 4,
    page: 1,
    sort: '',
    order: '',
    isLoading: false,
    message: '',
    icSort: 'up'
  }
  async componentDidMount () {
    await this.props.transactionHistory(this.props.auth.token, this.state.search, this.state.limit)
  }
  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value }, async () => {
      await this.props.transactionHistory(this.props.auth.token, this.state.search, this.state.limit)
      if (this.props.transaction.transactionHistory) {
        this.setState({ message: '' })
      } else {
        this.setState({ message: 'No Transaction' })
      }
    })
  }
  next = async () => {
    if (this.state.page !== this.props.transaction.pageInfo.totalPage) {
      this.setState({ isLoading: true })
      await this.props.transactionHistory(this.props.auth.token, this.state.search, this.state.limit, this.state.page + 1, this.state.sort, this.state.order)
      this.setState({
        isLoading: false,
        page: this.state.page + 1
      })
    } else {
      this.setState({
        page: this.state.page
      })
    }
  }
  prev = async () => {
    if (this.state.page > 1) {
      this.setState({ isLoading: true })
      await this.props.transactionHistory(this.props.auth.token, this.state.search, this.state.limit, this.state.page - 1, this.state.sort, this.state.order)
      this.setState({
        isLoading: false,
        page: this.state.page - 1
      })
    } else {
      this.setState({
        page: this.state.page
      })
    }
  }
  order = async (value) => {
    this.setState({ isLoading: true })
    if (this.state.icSort === 'down') {
      this.setState({ icSort: 'up', isLoading: false, order: value, sort: 'DESC' })
      await this.props.transactionHistory(this.props.auth.token, this.state.search, this.state.limit, this.state.page, value, 'DESC')
    } else {
      this.setState({ icSort: 'down', isLoading: false, order: value, sort: 'ASC' })
      await this.props.transactionHistory(this.props.auth.token, this.state.search, this.state.limit, this.state.page, value, 'ASC')
    }
  }
  render () {
    console.log(this.props.transaction.transactionHistory)
    return (
      <Card className="card-menu border-0">
        <Card.Body>
          <p className="text-display-xs-bold-18">Transaction History <i className={`fa fa-sort-${this.state.icSort}`} onClick={() => { this.order('dateTransaction') }} /></p>
          <Form className="my-3">
            <FormSearch group="searchIcon" type="text" name="search" onChange={(event) => this.changeText(event)} placeholder="Search receiver here" className="ContactInputSearch">
              <i className="fa fa-search" aria-hidden="true"></i>
            </FormSearch>
          </Form>
          <div id="scrollmenu">
            {this.props.transaction.transactionHistory && this.state.isLoading !== true
              ? this.props.transaction.transactionHistory.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="d-flex justify-content-between pt-3">
                      <div className="d-flex justify-content-center align-content-center">
                          <Image src={item.picture ? `http://localhost:5000/upload/profile/${item.picture}` : defaultProfile} width={56} height={56} className="img-avatar mr-3"/>
                        <div>
                          <p className="text-display-xs-bold-16 mb-2">{item.name}</p>
                          <p className="text-link-xs text-color-label">{item.status}</p>
                        </div>
                      </div>
                      <p className={`text-right ${item.userAs === 'sender' ? 'text-danger' : 'text-primary'} text-display-xs-bold-16`}>
                        {item.userAs === 'sender' ? '-' : '+'}Rp {item.amount}
                      </p>
                    </div>
                  </div>
                )
              })
              : this.state.message ? this.state.message : this.props.transaction.transactionHistory === undefined ? 'Not Transaction' : <div className="text-center"><Spinner animation="border" variant="success" /></div>}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-300-12">
              {`Total data ${this.props.transaction.transactionHistory ? this.props.transaction.pageInfo.totalData : '0'}`}
            </div>
            <div>
              <Button className="btn outline-primary mr-3" onClick={this.prev}>Prev Link</Button>
              <Button className="btn outline-primary" onClick={this.next}>Next Link</Button>
            </div>
            <div className="text-300-12">
              {`Current Page ${this.state.page} Total Page ${this.props.transaction.transactionHistory ? this.props.transaction.pageInfo.totalPage : '0'}`}
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction
})

const mapDispatchToProps = { transactionHistory }

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
