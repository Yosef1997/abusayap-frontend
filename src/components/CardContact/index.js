import React from 'react'
import { Media, Image } from 'react-bootstrap'
import defaultProfile from '../../assets/images/default-image.png'
import './CardContact.css'

const CardContact = (props) => {
  return (
    <div>
      <div onClick={props.onClick} className="ContacCard">
        <Media>
          <Image
            width={70}
            height={70}
            className="mr-3 imgContact"
            src={props.data.picture ? `http://localhost:5000/upload/profile/${props.data.picture}` : defaultProfile}
            alt="Generic placeholder"
          />
          <Media.Body>
            <p className="my-2 text-display-xs-bold-18">{props.data.name}</p>
            <p className="m-0 text-sm">
              {props.data.phoneNumber ? `+62 ${props.data.phoneNumber}` : 'Not PhoneNumber'}
            </p>
          </Media.Body>
        </Media>
      </div>
    </div>
  )
}

export default CardContact
