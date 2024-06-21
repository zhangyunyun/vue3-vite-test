import axios from 'axios'
import { Toast, showConfirmDialog } from 'vant'

// 创建axios实例
const ajax = axios.create({
   baseURL: '/api', //所有的请求地址前缀部分(没有后端请求不用写)
   //timeout:20000, //请求超时时间(毫秒)
   // withCredentials:true, // 跨域请求时是否需要使用凭证
   responseType: 'json', // 服务器响应返回的数据类型
   headers: {
      //设置后端需要的传参类型
      'Content-Type': 'application/json;charset=utf-8',
      //'token': 'x-auth-token', //一开始就要token
      //'X-Requested-With': 'XMLHttpRequest',
   }
})

//request拦截器
ajax.interceptors.request.use(
   config => {
      // 如果你要去localStor获取token,(如果你有)
      //let token = localStorage.getItem("x-auth-token");
      //if (token) {
      // 添加请求头
      //config.headers["Authorization"]="Bearer" + token
      //}
      return config
   },
   error => {
      // 对请求错误做些什么
      Promise.reject(error)
   }
)

// response 响应拦截器
/*ajax.interceptors.response.use(
   response => {
       // 对响应数据做点什么
       return response.data
   },
   error => {  
       // 对响应错误做点什么
       return Promise.reject(error)
   }
)*/
ajax.interceptors.response.use(
   (response) => {
      const { data: _data } = response
      const { data, code, msg } = _data
      //console.log(_data)

      if (code !== 0) {
         //请求失败
         showConfirmDialog({
            message: msg,
         }).then(() => {
            // on confirm
         }).catch(() => {
            // on cancel
         });
         return Promise.reject(msg)
      }
      //请求成功
      return data  //直接返回了data数据
   })

export default ajax