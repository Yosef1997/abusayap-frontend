import React from 'react'
import { Form } from 'react-bootstrap'
import './style.scss'

const FormInputAmount = (props) => {
  const { div, children, group, name, type, placeholder, onChange, defaultValue, value, onBlur, onKeyUp } = props
  return (
    <div className={div}>
      <Form.Group className={group}>
        <Form.Control
          onKeyUp={onKeyUp}
          className="shadow-none"
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          onBlur={onBlur}
          required
        />
        {children}
      </Form.Group>
    </div>
  )
}

export default FormInputAmount
