import apisauce from 'apisauce'

const create = (baseURL = 'http://localhost:3000/api/') => {
// const create = (baseURL = 'https://buymeby-dev.cfapps.io/api/') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')

  const registerVendor = (userAttributes) => api.post('vendor_auth', userAttributes)
  const loginVendor = (credentials) => api.post('vendor_auth/sign_in', credentials)
  const verifyToken = (tokenParams) => api.get('vendor_auth/validate_token', tokenParams)

  const config = api
  return {
    getRoot,
    getRate,
    registerVendor,
    loginVendor,
    verifyToken,
    config
  }
}

export default {
  create
}
