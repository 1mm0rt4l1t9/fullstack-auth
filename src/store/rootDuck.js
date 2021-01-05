import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";

import * as auth from "./ducks/auth.duck";

export const rootReducer = combineReducers({
  auth: auth.reducer,
});

export function* rootSaga() {
  yield all([
    auth.saga,
  ].map(saga => fork(saga)));
}