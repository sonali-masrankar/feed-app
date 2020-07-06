import Feeds from './Feeds'
import Login from './Login'
import UserDetails from './UserDetails'
export default {
  feeds: {
    Component: Feeds,
    id: 'feeds',
    path: 'all-feeds'
  },
  login: {
    Component: Login,
    id: 'login',
    path: 'sign-in'
  },
  userDetails: {
    Component: UserDetails,
    id: 'userDetails',
    path: 'user-details'
  }
}