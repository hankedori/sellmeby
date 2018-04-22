import { call, put } from 'redux-saga/effects'
import OrdersActions from '../Redux/OrdersRedux'
import { NavigationActions } from 'react-navigation'

export function * getOrders (api, action) {
  const response = yield call(api.getOrders)

  if (response.ok && response.data.orders && response.data.completed_orders) {
    yield put(OrdersActions.ordersSuccess(response.data.orders, response.data.completed_orders))
  } else {
    yield put(OrdersActions.ordersFailure())
  }
}

export function * completeOrder (api, action) {
  const { id } = action
  const response = yield call(api.completeOrder, id)

  if (response.ok && response.data.orders && response.data.completed_orders) {
    yield put(OrdersActions.ordersSuccess(response.data.orders, response.data.completed_orders))
    yield put(NavigationActions.navigate({ routeName: 'OrdersScreen' }))
  } else {
    yield put(OrdersActions.ordersFailure())
  }
}
