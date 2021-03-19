import React from 'react'
import CreateNewPassword from '../container/CreateNewPassword'

const CreateNewPasswordPage = (props) => {
  return (
    <CreateNewPassword token={props.match.params.token} />
  )
}

export default CreateNewPasswordPage
