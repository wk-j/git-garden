import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

declare var module

// import analytics from './core/analytics'

if (typeof document !== 'undefined') {
  // analytics()

  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

  const render = Comp => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      document.getElementById('root'),
    )
  }

  render(App)

  if (module.hot) {
    module.hot.accept('./components/App', () => {
      render(App)
    })
  }
}

// Export your top level component as JSX (for static rendering)