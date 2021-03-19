import React from 'react'
import { Form } from 'react-bootstrap'
import './style.scss'

const FormSearch = (props) => {
  const { div, children, group, name, type, placeholder, onChange, defaultValue } = props
  return (
    <div className={div}>
      <Form.Group className={group}>
      <Form.Control
        className="shadow-none"
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
      {children}
    </Form.Group>
    </div>
  )
}

export default FormSearch
