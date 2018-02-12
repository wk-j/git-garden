import axios from "axios"
import { Action } from "redux";
import { call, put, takeEvery } from "redux-saga/effects"
import { createReducer, Creator } from "./helper"

export const FETCH_GARDEN = "FETCH_GARDEN"
export const SET_GARDEN = "SET_GARDEN"
export const SELECT = "SELECT"

export const fetchGarden = Creator(FETCH_GARDEN)
export const setGarden = Creator(SET_GARDEN)
export const select = Creator(SELECT, "row", "col")

const endpoint =
  "https://urlreq.appspot.com/req?method=GET&url=https://github.com/"

const getTile = tile => ({
  count: parseInt(tile.getAttribute("data-count"), 10),
  date: tile.getAttribute("data-date")
})

export function* fetchGardenSaga({ payload }) {
  const { data: html } = yield call(axios.get, endpoint + payload)
  const parser = new DOMParser()
  const dom = parser.parseFromString(html, "text/html")

  const rows = dom
    .querySelector(".js-calendar-graph-svg")
    .querySelector("g")
    .querySelectorAll("g")

  const arr = Array.from(rows)

  const contributions = [...arr]
    .reverse()
    .map(week => [...Array.from(week.querySelectorAll(".day"))].map(getTile))

  yield put(setGarden(contributions))
}

export function* appWatcherSaga() {
  yield takeEvery(FETCH_GARDEN, fetchGardenSaga)
}

const initial = {
  garden: [],
  // tslint:disable-next-line:object-literal-sort-keys
  cursor: { row: 0, col: 0 },
}

export default createReducer(initial, state => ({
  [SET_GARDEN]: garden => ({
    ...state,
    garden,
  }),
  [SELECT]: ({ row, col }) => ({
    ...state,
    cursor: { row, col },
  }),
}))
