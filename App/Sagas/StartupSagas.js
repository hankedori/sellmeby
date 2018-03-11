import { put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'

export function * startup (action) {
  yield put(AuthActions.tokenRequest());
}
