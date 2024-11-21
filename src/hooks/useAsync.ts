/*
    hook搜索防抖 解决重复发送请求

    传递一个泛型
       <T> 是返回的数据类型为泛型,T表示是泛型
       asyncFun就是一个请求的函数,返回的结果是一个promise对象
       initValue 初始值(就是T的泛型)
       immediate 是不是立刻执行这样一个请求函数的标识(相当于flag),默认设置为true
*/
import { ref, UnwrapRef } from 'vue'
export function useAsync<T>(asyncFun: () => Promise<T>, initValue: T, immediate = true) {
  const pending = ref(false)
  const data = ref(initValue)
  const error = ref(null)
  const execute = function () {
    pending.value = true
    error.value = null
    return asyncFun()
      .then(res => {
        //请求成功
        data.value = res as UnwrapRef<T> //返回成功的结果数据,UnwrapRef是单层解包
        pending.value = false
      }).catch(err => {
        //请求失败
        error.value = err  //返回失败的结果
        pending.value = false  
      })
  }

  //判断是否立刻执行这个函数 
  if (immediate) {
    //immediate值为true,立即执行execute这个函数
    execute()
  }

  return {
    pending, //请求的状态，是否在请求中
    data, //请求返回的数据
    error, //请求失败返回的错误信息,判断这个错误是什么
    execute //函数，执行这个函数的距离
  }
}





