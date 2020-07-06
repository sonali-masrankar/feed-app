import React, { useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({})
  const [submitResponse, setSubmitResponse] = useState()
  const {
    toggleSignIn,
    onSignUpSubmit
  } = props
  const onSubmit = async () => {
    const response = await onSignUpSubmit(formData)
    setSubmitResponse(response)
  }
  const onChange = (event, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    })
  }
  const handleModalClose = () => {
    if (submitResponse === 'success') {
      toggleSignIn()
    } else if (submitResponse === 'failure') {
      setSubmitResponse(null)
    }
  }
  const commonProps = {
    onChange,
    fluid: true,
    required: true
  }
  return (
    <div>
      <Modal
        open={!(!submitResponse)}
        size='small'
        onClose={handleModalClose}
      >
        <Modal.Content>
          {(submitResponse === 'success') && <h3>User resgistration Successful!</h3>}
          {(submitResponse === 'failure') && <h3>Failed to Register User</h3>}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose} content='OK' />
        </Modal.Actions>
      </Modal>
      <Form inverted>
        <Form.Input {...commonProps} value={formData.firstName} name='firstName' label='First name' placeholder='Enter first name' />
        <Form.Input {...commonProps} value={formData.lastName} name='lastName' label='Last name' placeholder='Enter last name' />
        <Form.Input {...commonProps} value={formData.userName} name='userName' label='Username' placeholder='Enter username' />
        <Form.Input {...commonProps} value={formData.password} name='password' label='Password' type='password' placeholder='********' />
        <Button.Group floated='left'>
          <Button type='submit' onClick={onSubmit} content='SUBMIT' />
        </Button.Group>
        <Button.Group floated='right'>
          <Button onClick={toggleSignIn} inverted content='SIGN IN' />
        </Button.Group>
      </Form>
    </div>
  )
}
export default SignUpForm
