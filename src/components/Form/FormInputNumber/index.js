import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { Telephone } from 'react-bootstrap-icons'
import './style.scss'

const FormInputNumber = (props) => {
  const { name, type, placeholder, onChange, value, defaultValue, isValid, onBlur } = props
  return (
    <InputGroup className="py-4">
      <InputGroup.Prepend>
        <InputGroup.Text className="border-0 input-num-icon">
          <Telephone />
        </InputGroup.Text>
        <InputGroup.Text className="border-0 input-num-icon">+62</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        className="shadow-none input-num"
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        onBlur={onBlur}
        isValid={isValid}
        value={value}
        required
      />
    </InputGroup>
  )
}

export default FormInputNumber
