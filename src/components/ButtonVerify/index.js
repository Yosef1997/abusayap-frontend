import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
  render () {
    return (
      <div>
        <div onClick={this.props.onClick} className='accept'>
          Accept
        </div>
        <div onClick={this.props.onClick} className='reject'>
          Reject
        </div>
      </div>
    )
  }
}
