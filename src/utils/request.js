import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
// import md5 from 'md5'
// import LRU from 'lru-cache'

// 给api加3秒缓存
// const CACHED = new LRU({
//   max: 1000,
//   maxAge: 1000 * 3
// })

/* 创建axios实例 */
const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: 'https://tbd.wshang.com/',
  timeout: 5000 // 请求超时时间
  // interceptors: true, // 是否开启response拦截器 默认true
  // noAssign: false // 请求体是否带defaultConfig 默认false
  // timeout: 5000 // 请求超时时间
})

// let key

// request拦截器
service.interceptors.request.use(config => {
  if (config.method.toUpperCase() === 'POST') {
    config.data = qs.stringify(config.data || config.params)
  }
  // 服务端才加缓存，浏览器端就不管了
  // if (config.cache && !process.browser) {
  //   const { params = {}, data = {} } = config
  //   key = md5(config.url + JSON.stringify(params) + JSON.stringify(data))
  //   if (CACHED.has(key)) {
  //     // 缓存命中
  //     return Promise.resolve(CACHED.get(key))
  //   }
  // }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

/* respone拦截器 */
service.interceptors.response.use(
  response => {
    // if (response.config.cache && !process.browser) {
    //   // 返回结果前先设置缓存
    //   // CACHED.set(key, response)
    // }
    return response
  },
  error => {
    Message({
      message: '连接服务器失败',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
