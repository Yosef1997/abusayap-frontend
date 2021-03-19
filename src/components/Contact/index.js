import React, { Component } from 'react'
import './Contact.css'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import FormSearch from '../Form/FormSearch'
import CardContact from '../CardContact'

import { connect } from 'react-redux'
import { contact } from '../../redux/action/user'
import { selectReceiver } from '../../redux/action/transaction'

class index extends Component {
  state = {
    search: ''
  }
  async componentDidMount () {
    await this.props.contact(this.props.auth.token)
  }
  goToTransaction = async (value) => {
    await this.props.selectReceiver(value)
    this.props.history.push('/home-page/contact/input-amount')
  }
  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value }, async () => {
      await this.props.contact(this.props.auth.token, this.state.search)
    })
  }
  render () {
    return (
      <Container fluid className="ContactContainer">
        <Row>
          <Col>
            <div className="ContacTitle">Search Receiver</div>
            <Form className="my-3">
              <FormSearch group="searchIcon" type="text" name="search" onChange={(event) => this.changeText(event)} placeholder="Search receiver here">
                <i className="fa fa-search" aria-hidden="true"></i>
              </FormSearch>
            </Form>
            <div>
              {this.props.user.contact
                ? this.props.user.contact.map(item => {
                  return (
                    <CardContact key={String(item.id)} data={item} onClick={() => this.goToTransaction(item)} />
                  )
                })
                : (<Spinner animation="border" variant="success" />)}
            </div>
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

const mapDispatchToProps = { contact, selectReceiver }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
