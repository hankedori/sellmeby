import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ordersRequest: null,
  ordersSuccess: ['orders', 'completed_orders'],
  ordersFailure: null,
  orderComplete: ['id']
})

export const OrdersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  orders: [],
  completed_orders: [],
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { orders, completed_orders } = action
  return state.merge({ fetching: false, error: null, orders, completed_orders })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDERS_REQUEST]: request,
  [Types.ORDERS_SUCCESS]: success,
  [Types.ORDERS_FAILURE]: failure,
  [Types.ORDER_COMPLETE]: request
})
