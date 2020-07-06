import React from 'react'
import { Header, Icon, Segment, Card, Image, Feed } from 'semantic-ui-react'
import VideoPlayer from './VideoPlayer'
const PostsDisplay = (props) => {
  const {
    filteredPosts
  } = props
  return (
    <Segment className='postBlock'>
      <Header as='h5' color='blue'> FEED </Header>
      {
        filteredPosts.map(post => {
          const { postId, type, userName, text, fileUrl, createdAt } = post
          const date = new Date(createdAt)
          const dateString = date.toDateString()
          let content = null
          if (type === 'text') {
            content = <Card.Content description={text} />
          } else if (type === 'image') {
            content = <Card.Content>
              <Image src={fileUrl} />
            </Card.Content>
          } else if (type === 'video') {
            content = <Card.Content>
              <VideoPlayer src={fileUrl} />
            </Card.Content>
          }
          return (
            <Card fluid key={postId}>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Label>
                      <Icon name='user' />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <Feed.User>{userName}</Feed.User> posted on
                        <Feed.Date>{dateString}</Feed.Date>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
              {content}
            </Card>
          )
        })
      }
    </Segment>
  )
}
export default PostsDisplay
