/*
 * @Author: v3-vite-test 876023825@qq.com
 * @Date: 2023-09-18 15:32:11
 * @LastEditors: v3-vite-test 876023825@qq.com
 * @LastEditTime: 2023-09-18 15:36:21
 * @FilePath: \v3-vite-test\src\hooks\useInterval.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { onUnmounted } from 'vue'
export function useInterval(fn: () => void, delay?:number | undefined){
  const timer = setInterval(() => {
    fn()
  },delay)

  const clear = () => {
    clearInterval(timer)
  }

  onUnmounted(clear)  //当组件销毁的时候清空timer = setInterval()

  return clear
}





