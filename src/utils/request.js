import axios from 'axios'

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  timeout: 5000
})

service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject()
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  } else {
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject()
  }
}, error => {
  console.log(error)
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject()
})

export default service
