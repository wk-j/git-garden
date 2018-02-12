import { applyMiddleware, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
// import { persistStore } from 'redux-persist'
import { reducers, rootSaga } from "./root"

declare var module

/* eslint no-undef: 0 */

export default () => {
  const saga = createSagaMiddleware()
  const middleware = [saga]
  const composeEnhancers = compose

  if (typeof window !== "undefined") {
    // composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware)),
  )

  // persistStore(store)

  if (module.hot) {
    module.hot.accept(() => {
      const nextReducers = require("./root").reducers
      store.replaceReducer(nextReducers)
    })
  }

  saga.run(rootSaga)

  return store
}
