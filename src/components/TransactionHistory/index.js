import React, { Component } from 'react'
import { Card, Image, Button, Form, Spinner } from 'react-bootstrap'
import FormSearch from '../Form/FormSearch'
import defaultProfile from '../../assets/images/default-image.png'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { transactionHistory, transactionHistoryNew } from '../../redux/action/transaction'
import rupiah from '../../helper/rupiah'
import qs from 'querystring'

class TransactionHistory extends Component {
  state = {
    isLoading: false,
    message: '',
    icSort: 'up'
  }
  async componentDidMount () {
    const { token } = this.props.auth
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    await this.props.transactionHistoryNew(token, query)
  }

  changeText = async (event) => {
    const { token } = this.props.auth
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    await this.setState({ isLoading: true })
    delete query.page
    if (event.target.value) {
      query.search = event.target.value
    } else {
      delete query.search
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
    await this.props.transactionHistoryNew(token, query)
    await this.setState({ isLoading: false })
  }

  order = async (value) => {
    const { token } = this.props.auth
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    await this.setState({ isLoading: true })
    if (this.state.icSort === 'down') {
      await this.setState({ icSort: 'up' })
      query.sort = value
      query.order = 'DESC'
    } else {
      await this.setState({ icSort: 'down' })
      query.sort = value
      query.order = 'ASC'
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
    await this.props.transactionHistoryNew(token, query)
    await this.setState({ isLoading: false })
  }
  next = async () => {
    const { token } = this.props.auth
    const { pageInfo } = this.props.transaction
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    if (pageInfo.nextLink) {
      await this.setState({ isLoading: true })
      query.page = pageInfo.currentPage + 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      await this.props.transactionHistoryNew(token, query)
      await this.setState({ isLoading: false })
    }
  }
  prev = async () => {
    const { token } = this.props.auth
    const { pageInfo } = this.props.transaction
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    if (pageInfo.prevLink) {
      await this.setState({ isLoading: true })
      query.page = pageInfo.currentPage - 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      await this.props.transactionHistoryNew(token, query)
      await this.setState({ isLoading: false })
    }
  }

  render () {
    const { pageInfo } = this.props.transaction
    return (
      <Card className="card-menu border-0">
        <Card.Body>
          <p className="text-display-xs-bold-18">Transaction History <i className={`fa fa-sort-${this.state.icSort}`} style={{ cursor: 'pointer' }} onClick={() => { this.order('dateTransaction') }} /></p>
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
                        <Image src={item.picture ? `http://localhost:5000/upload/profile/${item.picture}` : defaultProfile} width={56} height={56} className="img-avatar mr-3" />
                        <div>
                          <p className="text-display-xs-bold-16 mb-2">{item.name}</p>
                          <p className="text-link-xs text-color-label">{item.status}</p>
                        </div>
                      </div>
                      <p className={`text-right ${item.userAs === 'sender' ? 'text-danger' : 'text-primary'} text-display-xs-bold-16`}>
                        {item.userAs === 'sender' ? '-' : '+'}Rp {rupiah(item.amount)}
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
              <Button className="btn outline-primary mr-3" onClick={this.prev}
                disabled={!pageInfo.prevLink}
              >Prev Link</Button>
              <Button className="btn outline-primary" onClick={this.next}
                disabled={!pageInfo.nextLink}
              >Next Link</Button>
            </div>
            <div className="text-300-12">
              {`Current Page ${pageInfo.currentPage} Total Page ${this.props.transaction.transactionHistory ? this.props.transaction.pageInfo.totalPage : '0'}`}
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

const mapDispatchToProps = { transactionHistory, transactionHistoryNew }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionHistory))
