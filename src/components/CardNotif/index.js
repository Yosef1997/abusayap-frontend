import React, { Component } from 'react'
import { Card, Image } from 'react-bootstrap'
import listTransfer from '../../utils/listTransfer'
import listSubscription from '../../utils/listSubscription'
import ArrowUp from '../../assets/icons/arrow-up.png'
import ArrowDown from '../../assets/icons/arrow-down.png'

import './style.scss'

export default class CardNotif extends Component {
  state = {
    listTransfer,
    listSubscription
  }
  render () {
    const { listTransfer } = this.state
    return (
      <Card className="card-notif border-0">
        <Card.Body id="scrollmenu">
          <p className="text-sm">Today</p>
          {listTransfer.map((item) => {
            return (
              <div key={item.id} className="pb-2">
                <div className="shadow-sm border-0 card-in-notif">
                  <div className="d-flex p-3">
                      <Image src={ArrowUp} height={28}/>
                      <div className="ml-3">
                        <p className="text-xs m-0">Transfer from {item.name}</p>
                        <p className="text-display-xs-bold-18 m-0">Rp {item.total}</p>
                      </div>
                  </div>
                </div>
              </div>
            )
          })}
          <p className="text-sm pt-3">This Week</p>
          {listSubscription.map((item) => {
            return (
              <div key={item.id} className="pb-2">
                <div className="shadow-sm border-0 card-in-notif">
                  <div className="d-flex p-3">
                      <Image src={ArrowDown} height={28}/>
                      <div className="ml-3">
                        <p className="text-xs m-0">{item.name} subscription</p>
                        <p className="text-display-xs-bold-18 m-0">Rp {item.total}</p>
                      </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Card.Body>
      </Card>
    )
  }
}
