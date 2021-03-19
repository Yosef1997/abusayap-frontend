import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { Button } from 'react-bootstrap'
import DownloadIcon from '../../../assets/icons/download.png'

export default class index extends Component {
  render () {
    return (
      <div className="text-right">
        <Button className="BtnDownloadShare">
          <i className="fa fa-share-alt" aria-hidden="true"></i>
        </Button>
        <Button className="BtnDownloadInvoice mx-3">
          <span><img src={DownloadIcon} alt="icon" /></span>
          Download PDF
        </Button>
        <Link to="/home-page">
          <Button className="BtnDownloadHome">Back to Home</Button>
        </Link>
      </div>
    )
  }
}
