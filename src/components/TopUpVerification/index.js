import React, { Component } from 'react'
import './index.css'
import { Container, Row, Col, Table, Form } from 'react-bootstrap'
import ButtonStatus from '../ButtonVerify'
import FormSearch from '../Form/FormSearch'

export default class index extends Component {
  render () {
    return (
      <div className="TopUpContainer">
        <Container>
          <Row>
            <Col>
              <div className="TopUpTitle">Top Up Verification</div>
              <Form className="form">
                <FormSearch group="searchIcon" type="text" name="search" onChange={(event) => this.changeText(event)} placeholder="Search receiver here">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </FormSearch>
                <div className="sort">
                  <i className="fa fa-sort" aria-hidden="true"></i>
                </div>
              </Form>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Transfer Image</th>
                    <th>Username</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td>Mark Otto</td>
                    <td>Mark Otto</td>
                    <td><ButtonStatus /></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td>Jacob Thornton</td>
                    <td>@fat</td>
                    <td><ButtonStatus /></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td><ButtonStatus /></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}
