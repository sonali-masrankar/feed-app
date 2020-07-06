import React, { useEffect } from 'react'
import { Header, Icon, Input } from 'semantic-ui-react'
import AddPost from '../view/AddPost'
import PostsDisplay from '../view/PostsDisplay'
import { loadPosts, createTextPost } from '../api'

const Feeds = (props) => {
  const {
    dispatch,
    rootState,
    rootState: { filteredPosts, user, loggedIn },
    history,
    location: { pathname }
  } = props

  const fetchAllPosts = () => loadPosts(rootState, dispatch, {})

  useEffect(() => {
    if (!loggedIn) {
      history.push({
        pathname: '/sign-in',
        state: {
          backpath: pathname
        }
      })
    } else {
      fetchAllPosts()
    }
  }, [loggedIn, history, pathname])

  const onTextPostSubmit = (data) => {
    return createTextPost(rootState, dispatch, data)
  }

  const onSearch = (event, data) => {
    const search = data.value
    dispatch({ type: 'filterPosts', payload: { search } })
  }
  if (!loggedIn) {
    return null
  }
  const { userName, firstName, lastName } = user
  return (
    <div className='feeds'>
      <div className='mainHeader'>
        <Header as='h3' floated='right'>
          <Input onChange={onSearch} size='small' icon='search' placeholder='username, text search' />
        </Header>
        <Header as='h2' floated='left'>
          <Icon name='user' />
          Feed App
        </Header>
      </div>
      <Header className='welcome' as='h3'>
        {`Welcome, ${firstName} ${lastName}`}
      </Header>
      <AddPost fetchAllPosts={fetchAllPosts} onTextPostSubmit={onTextPostSubmit} userName={userName} />
      <PostsDisplay filteredPosts={filteredPosts} />
    </div>
  )
}
export default Feeds
