import axios from 'axios'
import config from './config'

export const loadPosts = async (state, dispatch, payload) => {
  dispatch({ type: 'setLoading' })
  try {
    const response = await axios.get(`${config.serverUrl}/api/posts/get`)
    console.log('posts', response)
    dispatch({ type: 'updatePosts', payload: { allPosts: response.data.posts } })
  } catch (err) {
    console.log(err)
  }
}

export const createTextPost = async (state, dispatch, payload) => {
  dispatch({ type: 'setLoading' })
  try {
    await axios.post(`${config.serverUrl}/api/posts/create/${state.user.userName}`, {
      text: payload
    })
    dispatch({ type: 'resetLoading' })
    return 'success'
  } catch (err) {
    console.log(err)
    return 'failure'
  }
}

export const registerUser = async (state, dispatch, payload) => {
  dispatch({ type: 'setLoading' })
  try {
    await axios.post(`${config.serverUrl}/api/users/create`, payload)
    dispatch({ type: 'resetLoading' })
    return 'success'
  } catch (err) {
    console.log(err)
    return 'failure'
  }
}

export const userLogin = async (state, dispatch, payload) => {
  dispatch({ type: 'setLoading' })
  try {
    const userResponse = await axios.post(`${config.serverUrl}/api/users/signin`, payload)
    dispatch({ type: 'setUser', payload: { user: userResponse.data.user } })
  } catch (err) {
    console.log(err)
    return 'failure'
  }
}
