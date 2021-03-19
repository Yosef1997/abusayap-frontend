import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default class index extends Component {
  render () {
    return (
      <div className="text-right">
        <Link to="/home-page/contact/input-amount">
          <Button className="BtnFailedResultTransaction">Try Again</Button>
        </Link>
      </div>
    )
  }
}
