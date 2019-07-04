import axios from 'axios'

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  baseURL: 'http://localhost:8080/',
  timeout: 5000,
  // 允许携带token ,这个是解决跨域产生的相关问题
  withCredentials: true
})

// 请求发送拦截
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject()
})

// 请求响应拦截
service.interceptors.response.use(
  // 请求成功
  response => {
    if (response.status === 200 && response.data.status !== 1000) {
      // 请求成功 返回状态 不是重新登入码
      return response.data
    } else {
      // 请求成功 需要重新登入
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject()
    }
  },
  // 请求错误
  error => {
    console.log(error)
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject()
  }
)

export default service
