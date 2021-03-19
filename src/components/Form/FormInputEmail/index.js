import React from 'react'
import { Form } from 'react-bootstrap'

const FormInputEmail = (props) => {
  const { name, type, placeholder, onChange, defaultValue } = props
  return (
    <Form.Group>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
    </Form.Group>
  )
}

export default FormInputEmail
