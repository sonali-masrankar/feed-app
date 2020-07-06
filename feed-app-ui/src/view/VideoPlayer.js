import React from 'react'
import axios from 'axios'

import videojs from 'video.js'
import './videoPlayer.css'

class VideoPlayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      videoJsOptions: null
    }
  }

  componentDidMount () {
    axios.get(this.props.src)
      .then(res => {
        this.setState({
          loaded: true,
          videoJsOptions: {
            autoplay: false,
            controls: true,
            sources: [{
              src: this.props.src
            }]
          }
        }, () => {
          console.log('-')
          console.log(this.videoNode)
          console.log('-')
          console.log(this.state.videoJsOptions)
          this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady () {
          // console.log('onPlayerReady', this)
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  }

  render () {
    return (
      <div className='row' style={{ width: '100vw' }}>
        <div className='col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5'>
          {this.state.loaded ? (
            <div data-vjs-player>
              <video ref={node => this.videoNode = node} className='video-js vjs-big-play-centered' />
            </div>
          ) : ' Loading ... '}
        </div>
      </div>
    )
  }
}

export default VideoPlayer
