import { all, fork } from "redux-saga/effects"

import authSaga from "../services/auth/authSaga"
import utilitiesSaga from '../services/utilities/utilitiesSaga'
import adminSaga from "../services/admin/adminSaga"

function* rootSagas() {
  yield all([
    fork(authSaga),
    fork(utilitiesSaga),
    fork(adminSaga)
  ])
}

export default rootSagas
