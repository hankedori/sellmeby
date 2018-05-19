import { call, put } from 'redux-saga/effects'
import ItemActions from '../Redux/ItemRedux'
import VendorActions from '../Redux/VendorRedux'
import { NavigationActions } from 'react-navigation'
import Toast from 'react-native-simple-toast'

export function * createItem (api, action) {
  const { data } = action
  const form = new FormData()

  form.append('image', data.image)
  form.append('name', data.name)
  form.append('description', data.description)
  form.append('price', data.price)
  form.append('unit', data.unit)
  form.append('quantity', data.quantity)

  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const response = yield call(api.createItem, form, headers)

  if (response.ok) {
    yield put(ItemActions.success(response.data))
    yield put(VendorActions.vendorRequest())
    yield put(NavigationActions.reset(
     {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'StoreScreen'})
        ]
      }
    ));
  } else {
    Toast.show('An error occured: ' + Object.keys(response.data)[0] + Object.values(response.data)[0]);
    yield put(ItemActions.failure())
  }
}

export function * updateItem (api, action) {
  const { data } = action
  const form = new FormData()

  form.append('name', data.name)
  form.append('description', data.description)
  form.append('price', data.price)
  form.append('unit', data.unit)
  form.append('quantity', data.quantity)
  if (data.image.name) {
    form.append('image', data.image)
  }

  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const response = yield call(api.updateItem, data.id, form, headers)

  if (response.ok) {
    yield put(ItemActions.success(response.data))
    yield put(VendorActions.vendorRequest())
    yield put(NavigationActions.reset(
     {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'StoreScreen'})
        ]
      }
    ));
  } else {
    Toast.show('An error occured: ' + Object.keys(response.data)[0] + Object.values(response.data)[0]);
    yield put(ItemActions.failure())
  }
}
