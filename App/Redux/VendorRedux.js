import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  logoRequest: ['logo'],
  logoSuccess: ['logo_src'],
  logoFailure: null,
})

export const VendorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  logo: null,
  uploading: false,
  logo_failed: false,
  logo_src: null
})

/* ------------- Reducers ------------- */

export const logoRequest = (state, { data }) =>
  state.merge({ uploading: true })

export const logoSuccess = (state, action) => {
  const { logo_src } = action
  return state.merge({ uploading: false, logo_failed: null, logo_src })
}

export const logoFailure = state =>
  state.merge({ uploading: false, logo_failed: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGO_REQUEST]: logoRequest,
  [Types.LOGO_SUCCESS]: logoSuccess,
  [Types.LOGO_FAILURE]: logoFailure,
})
