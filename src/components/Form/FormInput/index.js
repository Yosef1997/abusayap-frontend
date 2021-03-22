import React from 'react'
import { Form } from 'react-bootstrap'
import './style.scss'

const FormInput = (props) => {
  const { div, children, group, name, type, controlId, placeholder, isValid, onChange, defaultValue, value, onBlur, onKeyUp } = props
  return (
    <div className={div}>
      <Form.Group className={group} controlId={controlId}>
        <Form.Control
          className="shadow-none"
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          onBlur={onBlur}
          isValid={isValid}
          required
          onKeyUp={onKeyUp}
        />
        {children}
      </Form.Group>
    </div>
  )
}

export default FormInput
