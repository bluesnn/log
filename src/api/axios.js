import axios from 'axios'
import qs from 'qs'
import store from '../store'
import env from '../../build/env'
import Cookies from 'js-cookie'
// Vue router
// axios 配置
axios.defaults.timeout = 5000;
const urlconfig = {
    'production': '/',
    'development': '/api'
}

// console.log(process.env.NODE_ENV)
const ajaxUrl = urlconfig[process.env.NODE_ENV]
axios.defaults.baseURL = ajaxUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(
  config => {
    if (Cookies.get('id_token')) {
      config.headers['Authorization'] = Cookies.get('id_token')
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
axios.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

export default axios