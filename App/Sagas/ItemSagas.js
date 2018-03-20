import { call, put } from 'redux-saga/effects'
import ItemActions from '../Redux/ItemRedux'

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
  } else {
    yield put(ItemActions.failure())
  }
}
