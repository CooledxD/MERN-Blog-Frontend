import axios from 'axios'

// Adding a base url to a request
const preSetupAxios = axios.create({
  baseURL: process.env.HOST
})

// Adding a user token to the request
preSetupAxios.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})

export default preSetupAxios