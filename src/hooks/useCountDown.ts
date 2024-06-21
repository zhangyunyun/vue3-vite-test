/* 
  倒计时 60s...
*/
import { ref } from 'vue'
import { onUnmounted } from 'vue'
export function useCountDown() {
  let count = ref(0)
  let timer: any

  const countDown = (second: number) => {
    count.value = second
    timer = setInterval(() => {
      count.value--
      if (count.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  //是否立即执行这个函数
  //if(immediate){
  //如果immediate为true,立即执行countDown这个函数
  //countDown()
  //}

  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    count,
    countDown
  }
}
