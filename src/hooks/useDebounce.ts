/*
    hook搜索防抖 解决重复发送请求
*/
// interface IDebounceFn<T>{
//  (...args: T[]): void | Promise<void>
// }

// export function useDebounce<T>(fn:IDebounceFn<T>,delay:number){
//   //创建一个标记用来存放定时器的返回值,null = null是初始值
//   let timer:number | null = null
//   return function f(this:void,...args: T[]){
//     //每当用户点击或者input输入时，把前一个定时器清除
//     if(timer){
//       clearTimeout(timer)
//     }
//     //然后创建一个新的setTimeout
//     /* 
//       这样就能保证点击按钮后的 interval 间隔内
//       如果用户还点击了的话，就不会执行 fn 函数
//     */
//     timer = setTimeout(() => {
//       //fn.apply(fn,arguments)
//       //timer = null
//       fn.call(this,...args)
//     }, delay)
//   }
// }

/*
  上述代码并不是真正意义上的hooks文件，这里优化将修改成hooks文件
  使用上ref reactive computed watch等响应式函数
*/
import type { Ref, UnwrapRef } from 'vue'
import { ref, watch, onUnmounted } from 'vue'
/** */
export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debounceValue = ref(value.value)
  let timer: number | null = null

  const unwatch = watch(value, (nv) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debounceValue.value = nv as UnwrapRef<T>
    }, delay)
  })

  onUnmounted(() => {
    unwatch()  //组件销毁的时候销毁watch
  });

  return debounceValue
}