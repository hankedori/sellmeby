import apisauce from 'apisauce'

// const create = (baseURL = 'http://10.0.2.2:3000/api/sellmeby/') => {
const create = (baseURL = 'http://localhost:3000/api/sellmeby/') => {
// const create = (baseURL = 'https://buymeby-dev.cfapps.io/api/sellmeby/') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')

  const registerVendor = (userAttributes) => api.post('auth', userAttributes)
  const loginVendor = (credentials) => api.post('auth/sign_in', credentials)
  const verifyToken = (tokenParams) => api.get('auth/validate_token', tokenParams)

  const getVendor = () => api.get('vendors')
  const updateVendor = (params) => api.patch('vendors', params)
  const updateHours = (hours) => api.post('update_hours', hours)
  const uploadLogo = (logo, headers) => api.post('upload_logo', logo, { headers })

  const createItem = (params, headers) => api.post('items', params, { headers })
  const updateItem = (id, params, headers) => api.patch('items/' + id, params, { headers })

  const getOrders = () => api.get('orders')
  const completeOrder = (id) => api.patch('orders/' + id)

  const config = api
  return {
    getRoot,
    getRate,
    registerVendor,
    loginVendor,
    verifyToken,
    getVendor,
    uploadLogo,
    updateVendor,
    updateHours,
    createItem,
    updateItem,
    getOrders,
    completeOrder,
    config
  }
}

export default {
  create
}
