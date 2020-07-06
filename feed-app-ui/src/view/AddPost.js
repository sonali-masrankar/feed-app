import React, { useState } from 'react'
import { Header, Modal, Segment, TextArea, Button } from 'semantic-ui-react'
import Upload from './Upload'
const AddPost = (props) => {
  const [postResponse, setPostResponse] = useState()
  const [textPost, setTextPost] = useState('')

  const {
    onTextPostSubmit,
    userName,
    fetchAllPosts
  } = props

  const onChange = (event, data) => {
    setTextPost(data.value)
  }

  const handleTextPostSubmit = async () => {
    const response = await onTextPostSubmit(textPost)
    setPostResponse(response)
  }

  const handleModalClose = (event) => {
    if (postResponse === 'success') {
      fetchAllPosts()
    }
    setTextPost('')
    setPostResponse(null)
  }

  return (
    <Segment className='postBlock'>
      <Header as='h5' color='blue'> ADD A POST</Header>
      <Modal
        open={!(!postResponse)}
        size='small'
        onClose={handleModalClose}
      >
        <Modal.Content>
          {(postResponse === 'success') && <h3>Post Success</h3>}
          {(postResponse === 'failure') && <h3>Failed to Post</h3>}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose} content='OK' />
        </Modal.Actions>
      </Modal>
      <TextArea className='textPost' name='textPost' value={textPost} onChange={onChange} placeholder="What's on your mind ?" />
      <br />
      <Button className='textPostButton' color='blue' size='large' disabled={!textPost} onClick={handleTextPostSubmit} content='Post' />
      <Upload fetchAllPosts={fetchAllPosts} userName={userName} />
    </Segment>
  )
}
export default AddPost
