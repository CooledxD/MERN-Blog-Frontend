import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.HOST
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})

export default instance