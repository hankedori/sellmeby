import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ordersRequest: null,
  ordersSuccess: ['orders'],
  ordersFailure: null
})

export const OrdersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  orders: [],
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, orders: [] })

// successful api lookup
export const success = (state, action) => {
  const { orders } = action
  return state.merge({ fetching: false, error: null, orders })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, orders: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDERS_REQUEST]: request,
  [Types.ORDERS_SUCCESS]: success,
  [Types.ORDERS_FAILURE]: failure
})
