import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import VendorActions from '../Redux/VendorRedux'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'

const authHeaderKeys: Array<string> = [
  'access-token',
  'token-type',
  'client',
  'expiry',
  'uid',
]

export function * verifyToken (api, action) {
  if (AsyncStorage.getItem('access-token')) {
    const tokenParams = {
      'access-token': yield call([AsyncStorage, 'getItem'], 'access-token'),
      'client': yield call([AsyncStorage, 'getItem'], 'client'),
      'uid': yield call([AsyncStorage, 'getItem'], 'uid')
    }
    const response = yield call(api.verifyToken, tokenParams)

    if (response.ok) {
      setAuthHeaders(response.headers, api)
      persistAuthHeadersInDeviceStorage(response.headers)
      yield put(AuthActions.tokenSuccess(response.data))
      if (response.data.data.setup_complete) {
        yield put(VendorActions.vendorRequest())
        yield put(NavigationActions.navigate({ routeName: 'MainTabNav'}))
      } else {
        yield put(VendorActions.vendorRequest())
        yield put(NavigationActions.navigate({ routeName: 'MainTabNav'}))
      }
    } else {
      yield put(AuthActions.tokenFailure())
      yield put(NavigationActions.navigate({ routeName: 'RegistrationScreen'}))
    }
  } else {
    yield put(AuthActions.tokenFailure())
    yield put(NavigationActions.navigate({ routeName: 'RegistrationScreen'}))
  }
}

export function * login (api, action) {
  const {
    email,
    password
  } = action
  const data = {
    email,
    password
  }

  const response = yield call(api.loginVendor, data)

  if (response.ok) {
    setAuthHeaders(response.headers, api)
    persistAuthHeadersInDeviceStorage(response.headers)
    yield put(AuthActions.loginSuccess(response.data))
    yield put(NavigationActions.navigate({ routeName: 'InitialSetupStack'}))
  } else {
    yield put(AuthActions.loginFailure())
  }
}

export function * register (api, action) {
  const {
    name,
    email,
    password,
    password_confirmation
  } = action
  const data = {
    name,
    email,
    password,
    password_confirmation
  }

  // make the call to the api
  const response = yield call(api.registerVendor, data)

  // success?
  if (response.ok) {
    setAuthHeaders(response.headers, api)
    persistAuthHeadersInDeviceStorage(response.headers)
    yield put(AuthActions.registrationSuccess(response.data))
    yield put(NavigationActions.navigate({ routeName: 'InitialSetupStack'}))
  } else {
    yield put(AuthActions.registrationFailure())
  }
}

const setAuthHeaders = (headers, api) => {
  authHeaderKeys.forEach((key: string) => {
    api.config.setHeader(key, headers[key])
  })
}

const persistAuthHeadersInDeviceStorage = (headers) => {
  authHeaderKeys.forEach((key: string) => {
    AsyncStorage.setItem(key, headers[key])
  })
}

const deleteAuthHeaders = (): void => {
  authHeaderKeys.forEach((key: string) => {
    delete axios.defaults.headers.common[key]
  })
}

const deleteAuthHeadersFromDeviceStorage = async (Storage: DeviceStorage): Promise<void> => {
  authHeaderKeys.forEach((key: string) => {
    Storage.removeItem(key)
  })
}
