import React, { useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

const LoginForm = (props) => {
  const [formData, setFormData] = useState({})
  const [authFailure, setAuthFailure] = useState(false)
  const {
    toggleSignIn,
    onSignInSubmit
  } = props
  const onSubmit = async () => {
    const response = await onSignInSubmit(formData)
    if (response === 'failure') {
      setAuthFailure(true)
    }
  }
  const onChange = (event, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    })
  }
  const handleModalClose = () => {
    setAuthFailure(false)
  }
  const commonProps = {
    onChange,
    fluid: true,
    required: true
  }
  return (
    <div>
      <Modal
        open={authFailure}
        size='small'
        onClose={handleModalClose}
      >
        <Modal.Content>
          <h3>Failed to Authorize user !</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose} content='OK' />
        </Modal.Actions>
      </Modal>
      <Form inverted>
        <Form.Input {...commonProps} value={formData.userName} name='userName' label='Username' placeholder='Enter username' />
        <Form.Input {...commonProps} value={formData.password} name='password' label='Password' type='password' placeholder='********' />
        <Button.Group floated='left'>
          <Button type='submit' onClick={onSubmit} content='SUBMIT' />
        </Button.Group>
        <Button.Group floated='right'>
          <Button onClick={toggleSignIn} inverted content='REGISTER' />
        </Button.Group>
      </Form>
    </div>
  )
}
export default LoginForm
