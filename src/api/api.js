import axios from './axios'
import qs from 'qs'
// 登录
export function Login (data) {
  return axios.post('/auth', qs.stringify(data)).then(res => res.data)
}
// 获取菜单
export function getMenu () {
  return axios.get('/menu').then(res => res.data)
}
// 获取日志详情
// channel	是	string	日志渠道名称
// name	是	string	日志名称
// page	是	uint	分页
// limit	是	uint	每页字节数
export function getLogid () {
  return axios.get('/menu').then(res => res.data)
}
