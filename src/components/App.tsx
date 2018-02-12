import * as React from 'react'
import { Provider } from 'react-redux'
import { lifecycle } from 'recompose'
import { injectGlobal } from 'emotion'
import { Route, Switch, Router } from "react-router-dom"
import Landing from '../routes'
import Garden from '../routes/garden'
import NotFound from '../routes/404'

import createBrowserHistory from 'history/createBrowserHistory'

import createStore from '../ducks'

const store = createStore()


const customHistory = createBrowserHistory()

const App = () => (
  <Provider store={store}>
    <Router history={customHistory}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:id" component={Garden} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)

const enhance = lifecycle({
  componentWillMount() {
    injectGlobal`
      body {
        margin: 0;
        color: #555;
        min-height: 100vh;
        font-weight: 300;
        font-family: Roboto, "Helvetica Neue", "Sukhumvit Set", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", sans-serif;

        background: #fbfcff;
      }

      * {
        box-sizing: border-box;
      }
    `
  },
})

export default enhance(App)