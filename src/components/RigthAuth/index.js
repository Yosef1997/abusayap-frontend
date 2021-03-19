import React from 'react'
import { Container, Form } from 'react-bootstrap'

const RightAuth = (props) => {
  return (
    <Container>
      <p className="text-title">Start Accessing Banking Needs
        With All Devices and All Platforms
        With 30.000+ Users</p>
      <p className="text-info-app">
        Transfering money is eassier than ever, you can access Abusayap wherever you are.
        Desktop, laptop, mobile phone? we cover all of that for you!
      </p>
      <Form>
        {props.children}
      </Form>
    </Container>
  )
}

export default RightAuth
