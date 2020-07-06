import React, { useReducer } from 'react'
import { createBrowserHistory } from 'history'
import router from './router'
import { initialState, reducer } from './reducer'
import { Dimmer, Loader } from 'semantic-ui-react'

const history = createBrowserHistory()

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // To implement redux for a better structure and avoid passing state directly. use selectors instead
  // To use action creators instead of passing dispatch directly
  // To make components subscribe to state instead of passing from the top most component for better performance

  return (
    <div className='App'>
      {
        (state.loading) && <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      }
      {router(history, state, dispatch)}
    </div>
  )
}

export default App
