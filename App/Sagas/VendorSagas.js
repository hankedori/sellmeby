import { call, put } from 'redux-saga/effects'
import VendorActions from '../Redux/VendorRedux'
import { NavigationActions } from 'react-navigation'

export function * uploadLogo (api, action) {
  const { logo } = action
  const form = new FormData()

  form.append('logo', logo)
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  const response = yield call(api.uploadLogo, form, headers)

  console.tron.log(response)
}
