import { persistCombineReducers } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { all } from "redux-saga/effects"

import app, { appWatcherSaga } from "./app"

const config = { key: "root", storage }

export const reducers = persistCombineReducers(config, { app })

export function* rootSaga() {
  yield all([appWatcherSaga()])
}
