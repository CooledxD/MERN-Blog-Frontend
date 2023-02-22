import axios from 'axios'

import { store } from '../redux/store.js'

// Adding a base url to a request
const preSetupAxios = axios.create({
  baseURL: process.env.HOST,
  withCredentials: true
})

// Adding a user token to the request
preSetupAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getState().auth.token}`

  return config
})

export default preSetupAxios