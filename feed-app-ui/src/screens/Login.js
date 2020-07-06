import React, { useState, useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import LoginForm from '../view/LoginForm'
import SignUpForm from '../view/SignUpForm'
import { registerUser, userLogin } from '../api'
const Login = (props) => {
  const [loginPage, setLoginPage] = useState(true)
  const {
    dispatch,
    rootState,
    rootState: { loggedIn },
    history,
    location: { pathname }
  } = props
  const onSignInSubmit = (formData) => {
    return userLogin(rootState, dispatch, formData)
  }
  const onSignUpSubmit = (formData) => {
    return registerUser(rootState, dispatch, formData)
  }

  useEffect(() => {
    if (loggedIn) {
      history.push({
        pathname: '/all-feeds',
        state: {
          backpath: pathname
        }
      })
    }
  }, [loggedIn, history, pathname])

  return (
    <Segment className='login' inverted color='blue'>
      {loginPage && <LoginForm
        toggleSignIn={() => setLoginPage(false)}
        onSignInSubmit={onSignInSubmit}
      />}
      {
        !loginPage && <SignUpForm
          toggleSignIn={() => setLoginPage(true)}
          onSignUpSubmit={onSignUpSubmit}
        />
      }
    </Segment>

  )
}
export default Login
