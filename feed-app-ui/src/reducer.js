
export const initialState = {
  user: null,
  loggedIn: false,
  allPosts: [],
  filteredPosts: [],
  loading: false
}
export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'updatePosts':
      return {
        ...state,
        loading: false,
        allPosts: payload.allPosts,
        filteredPosts: payload.allPosts
      }
    case 'filterPosts':
    {
      const { search, userName } = payload
      let filteredPosts = state.allPosts
      if (userName) {
        filteredPosts = filteredPosts.filter((post) => post.userName === userName)
      }
      if (search) {
        filteredPosts = filteredPosts.filter((post) => {
          if (post.userName.includes(search)) return true
          if (post.text && post.text.toLowerCase().includes(search.toLowerCase())) return true
          if (post.fileName && post.fileName.includes(search)) return true
          return false
        })
      }
      return {
        ...state,
        filteredPosts
      }
    }
    case 'setUser':
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: payload.user
      }
    case 'setLoading':
      return {
        ...state,
        loading: true
      }
    case 'resetLoading':
      return {
        ...state,
        loading: false
      }
    default:
      throw new Error()
  }
}
