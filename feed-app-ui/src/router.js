import React from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import screens from './screens'
import config from './config'

export default function (history, rootState, dispatch) {
  const { startingRoute } = config
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from={startingRoute} to='/sign-in' />
        {Object.keys(screens).map(key => {
          const { Component, path, id } = screens[key]
          return <Route
            exact path={`${startingRoute}${path}`} key={id} render={(props) => <Component
              id={id}
              dispatch={dispatch}
              rootState={rootState}
              {...props}
            />}
          />
        })}
      </Switch>
    </Router>
  )
}
