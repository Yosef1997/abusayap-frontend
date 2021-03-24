import React, { Component } from 'react'
import './index.css'
import { Container, Row, Col, Table, Form, Button, Spinner } from 'react-bootstrap'
import FormSearch from '../Form/FormSearch'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTopUpData, updateTopUpStatus } from '../../redux/action/topUp'
import qs from 'querystring'
import rupiah from '../../helper/rupiah'
import moment from 'moment'
const { REACT_APP_API_URL: API_URL } = process.env

class TopUpVerification extends Component {
  state = {
    isLoading: false,
    icSort: 'up',
    buttonCliked: {}
  }
  async componentDidMount () {
    const { token } = this.props.auth
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    await this.props.getTopUpData(token, query)
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
    await this.props.getTopUpData(token, query)
    await this.setState({ isLoading: false })
  }
  next = async () => {
    const { token } = this.props.auth
    const { pageInfo } = this.props.topUp
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    if (pageInfo.nextLink) {
      await this.setState({ isLoading: true })
      query.page = pageInfo.currentPage + 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      await this.props.getTopUpData(token, query)
      await this.setState({ isLoading: false })
    }
  }
  prev = async () => {
    const { token } = this.props.auth
    const { pageInfo } = this.props.topUp
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    if (pageInfo.prevLink) {
      await this.setState({ isLoading: true })
      query.page = pageInfo.currentPage - 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      await this.props.getTopUpData(token, query)
      await this.setState({ isLoading: false })
    }
  }
  prev = async () => {
    const { token } = this.props.auth
    const { pageInfo } = this.props.topUp
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    if (pageInfo.prevLink) {
      await this.setState({ isLoading: true })
      query.page = pageInfo.currentPage - 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      await this.props.getTopUpData(token, query)
      await this.setState({ isLoading: false })
    }
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
    await this.props.getTopUpData(token, query)
    await this.setState({ isLoading: false })
  }

  click = async (id, value) => {
    const { token } = this.props.auth
    await this.props.updateTopUpStatus(token, id, value)
    const clicked = {}
    // clicked[id] = value
    await this.setState({
      buttonCliked: {
        ...this.state.buttonCliked,
        ...clicked
      }
    })
  }
  render () {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    const page = query.page || 1
    return (
      <div className="TopUpContainer">
        <Container>
          <Row>
            <Col>
              <div className="TopUpTitle">Top Up Verification</div>
              <Form className="form">
                <FormSearch group="searchIcon" type="text" name="search" onChange={(event) => this.changeText(event)} placeholder="Search name here">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </FormSearch>
              </Form>
              <div >
                <Table striped bordered hover >
                  <thead>
                    <tr>
                      <th className='no-td'>No.</th>
                      <th >id</th>
                      <th className='image-td'>Transfer Image</th>
                      <th onClick={() => this.order('firstName')} className='thead'>name
                        {search.indexOf('firstName') === -1
                          ? <i className="fa fa-sort fa-color" aria-hidden="false"></i>
                          : <i className={`fa fa-sort-${this.state.icSort}`} />}
                      </th>
                      <th onClick={() => this.order('amount')} className='thead'>Amount
                        {search.indexOf('amount') === -1
                          ? <i className="fa fa-sort fa-color" aria-hidden="false"></i>
                          : <i className={`fa fa-sort-${this.state.icSort}`} />}
                      </th>
                      <th onClick={() => this.order('dateTransaction')} className='thead'>Date Transaction
                        {search.indexOf('dateTransaction') === -1
                          ? <i className="fa fa-sort fa-color" aria-hidden="false"></i>
                          : <i className={`fa fa-sort-${this.state.icSort}`} />}
                      </th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className='overflow'>
                    {this.state.isLoading
                      ? (<tr>
                        <td colSpan={6}>
                          <div className="center"><Spinner animation="border" variant="success" /></div>
                        </td>
                      </tr>)
                      : this.props.topUp.results && this.props.topUp.results.length !== 0
                        ? this.props.topUp.results.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className='no-td'>{page > 1 ? (page - 1) * 4 + index + 1 : index + 1}</td>
                              <td >{item.id}</td>
                              <td className='image-td'>
                                <img
                                  src={`${API_URL}upload/topUp/${item.picture}`}
                                  alt='photo-transfer'
                                  className='image-transfer'
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>Rp. {rupiah(item.amount)}</td>
                              <td>{moment(item.dateTransaction).format('lll')}</td>
                              <td className='center'>
                                {item.status === 'accept' || item.status === 'reject'
                                  ? (<p className={`${item.status}`}>{`Transaction ${item.status}ed`}</p>)
                                  : (<>
                                    <Button className='buttonRight'
                                      onClick={() => this.click(item.id, 'accept')}
                                    >Accept</Button>
                                    <Button variant="danger" className='buttonLeft'
                                      onClick={() => this.click(item.id, 'reject')}
                                    >Reject</Button>
                                  </>)}

                              </td>
                            </tr>)
                        })
                        : <tr>
                          <td colSpan={6}><p className='center'>No Data</p></td>
                        </tr>

                    }

                  </tbody>
                </Table>
              </div>
              {this.props.topUp.pageInfo && (<div className="d-flex justify-content-between align-items-center">
                <div className="text-300-12">
                  {`Total data ${this.props.topUp.pageInfo ? this.props.topUp.pageInfo.totalData : '0'}`}
                </div>
                <div>
                  <Button className="btn outline-primary mr-3" onClick={this.prev}
                    disabled={!this.props.topUp.pageInfo.prevLink}
                  >Prev Link</Button>
                  <Button className="btn outline-primary" onClick={this.next}
                    disabled={!this.props.topUp.pageInfo.nextLink}
                  >Next Link</Button>
                </div>
                <div className="text-300-12">
                  {`Current Page ${this.props.topUp.pageInfo.currentPage} Total Page ${this.props.topUp.pageInfo ? this.props.topUp.pageInfo.totalPage : '0'}`}
                </div>
              </div>)}
            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  topUp: state.topUp
})
const mapDispatchToProps = { getTopUpData, updateTopUpStatus }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopUpVerification))
