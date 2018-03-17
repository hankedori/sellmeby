import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  logoRequest: ['logo', 'nextRoute'],
  logoSuccess: ['logo_src'],
  failure: null,
  update: ['params', 'nextRoute'],
  updateSuccess: ['vendor'],
  updateHours: ['params', 'nextRoute']
})

export const VendorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  logo: null,
  uploading: false,
  failed: false,
  logo_src: null,
  vendor: null
})

/* ------------- Reducers ------------- */

export const logoRequest = (state, { data }) =>
  state.merge({ uploading: true })

export const logoSuccess = (state, action) => {
  const { logo_src } = action
  return state.merge({ uploading: false, failed: null, logo_src })
}

export const failure = state =>
  state.merge({ uploading: false, failed: true })


export const update = (state, { data }) =>
  state.merge({ uploading: true })


export const updateHours = (state, { data }) =>
  state.merge({ uploading: true })

export const updateSuccess = (state, action) => {
  const { vendor } = action
  return state.merge({ uploading: false, failed: null, vendor })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGO_REQUEST]: logoRequest,
  [Types.LOGO_SUCCESS]: logoSuccess,
  [Types.FAILURE]: failure,
  [Types.UPDATE]: update,
  [Types.UPDATE_HOURS]: update,
  [Types.UPDATE_SUCCESS]: updateSuccess
})
