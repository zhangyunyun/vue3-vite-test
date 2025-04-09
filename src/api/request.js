/*
 * @Author: Zhanglx
 * @Date: 2020-06-08 17:58:47
 * @LastEditors: Zhanglx
 * @LastEditTime: 2024-01-02 16:17:17
 * @FilePath: \oao\src\api\request.js
 * @Description:
 */
import { Toast } from 'vant'
import axios from 'axios'
import store from '@/store'
import router from '../router'

let contentType = 'application/json; charset=UTF-8'
let requestTimeout = 30000

const service = axios.create({
  baseURL: '/',
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})
/**
 * @description: 请求拦截器
 * @param {config}
 * @return: config
 */
service.interceptors.request.use(
  (config) => {
    if (config.headers.isLoading) {
      store.commit('common/showLoading')
    }

    if (store.state.user.accessToken) {
      config.headers.Authorization = store.state.user.accessToken
    }
    return config
  },
  () => {
    store.commit('common/hideLoading')
  },
)
/**
 * @description: 响应拦截器
 * @param {type}
 * @return: data
 */
service.interceptors.response.use(
  (response) => {
    store.commit('common/hideLoading')
    const {
      data,
      config: { url },
    } = response
    const { message, status } = data
    if (url.indexOf('oao_order/queryUserBox') != -1 && status == '501') {
      return data
    }
    if (status == '-99') {
      // 登录异常
      router.push({ path: '/loginError', query: { msg: JSON.stringify(data) } })
    } else if (status == '527') {
      // 刷新页面
      Toast({
        message: message,
        duration: 3000,
        onClose() {
          router.push({ path: '/order' })
        },
      })
    } else if (response.status != '200' || status == '302' || status == '301' || status == '504') {
      // 异常跳转错误页
      router.push({ path: '/errorMsg', query: { msg: message } })
    } else if (status == '-9999') {
      Toast({
        message: message,
        duration: 3000,
        onClose() {
          router.push({ path: '/order' })
        },
      })
    } else {
      // 异常提示
      status != '0' &&
        Toast({
          message,
          duration: 3000,
          className: message.length > 18 ? 'big-toast' : '',
        })
    }
    return data
  },
  (error) => {
    store.commit('common/hideLoading')
    let message = ''

    /* 网络请求异常处理 */
    if (error.response && error.response.status) {
      const status = error.response.status
      switch (status) {
        case 400:
          message = '错误的请求'
          break
        case 401:
          message = '未登录'
          break
        case 403:
          message = '登录过期，请重新登录'
          break
        case 404:
          message = '网络请求不存在'
          break
        case 500:
          message = '服务器异常，快去通知管理员吧~'
          break
        default:
          message = error.response.statusText
          break
      }
      router.push({ path: '/errorMsg', query: { msg: message } })
    } else {
      return error
    }
    return error
  },
)

const request = async (params, url, method) => {
  let data = params || {}
  let res = await service({
    url,
    data,
    method: method || 'POST',
  })
  return res
}
const LoadingRequest = async (params, url, method) => {
  let data = params || {}
  let res = await service({
    url,
    data,
    method: method || 'POST',
    headers: {
      isLoading: true,
    },
  })
  return res
}
export { request, LoadingRequest }
