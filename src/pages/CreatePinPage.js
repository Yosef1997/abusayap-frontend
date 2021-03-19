import React from 'react'
import CreatePin from '../container/CreatePin'

const CreatePinPage = (props) => {
  return (
    <CreatePin id={props.match.params.id} />
  )
}

export default CreatePinPage
