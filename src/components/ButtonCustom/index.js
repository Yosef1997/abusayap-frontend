import React from 'react'
import { Button } from 'react-bootstrap'
import './style.css'

const ButtonCustom = (props) => {
  const { type, onClick, children, disabled, block, size } = props
  return (
    <Button className="btn-custom" type={type} onClick={onClick} disabled={disabled} block={block} size={size}>
      {children}
    </Button>
  )
}

export default ButtonCustom
