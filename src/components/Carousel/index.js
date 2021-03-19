import React, { Component } from 'react'
import './index.css'
import { Carousel } from 'react-bootstrap'
import FotoTestimoni1 from '../../assets/images/Fototestimoni.jpg'
import FotoTestimoni2 from '../../assets/images/Fototestimoni2.png'

export default class index extends Component {
  render () {
    return (
      <div className="CarouselContainer">
        <Carousel>
          <Carousel.Item interval={3000}>
            <div className="CarouselCard">
              <div>
                <img src={FotoTestimoni2} alt="imageTestimoni" className="imgCarousel" />
              </div>
              <div className="nameCarousel">Alex Hansinburg</div>
              <div className="jobCarousel">Designer</div>
              <div className="testiCarousel">“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and <br />
                it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. <br />
                Just try this app and see the power!”
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <div className="CarouselCard">
              <div>
                <img src={FotoTestimoni1} alt="imageTestimoni" className="imgCarousel" />
              </div>
              <div className="nameCarousel">Saitama</div>
              <div className="jobCarousel">Orang Kere</div>
              <div className="testiCarousel">Mantul gan, banyak cashback</div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}
