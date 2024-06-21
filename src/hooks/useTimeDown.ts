/* 
  倒计时 天时分秒毫秒
  1s = 1000ms

*/
import { ref, computed } from 'vue'
import { rAF, cancelRAF } from '@/utils/raf.ts'
/* 
  定义CurrentTime类型
*/
type CurrentTime = {
  days: number    //天
  hours: number   //时
  minutes: number //分 
  seconds: number  //秒
  milliseconds: number //毫秒
  total: number   //总时间 如60S
}
/*
  定义UseCountDownOptions类型
*/
type UseCountDownOptions = {
  time: number //需要倒计时多长时间
  millisecond?: boolean  //是否需要毫秒级别的倒计时
  onChange?: (current: CurrentTime) => void  //当时间改变的时候就调用这个方法,current参数为当前时间
  onFinish?: () => void  //当倒计时时间结束后调用
}

/* 
  1秒 = 1000毫秒
  1分 = 60秒
  1小时 = 60分钟
  1天 = 24小时
*/
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

//计算毫秒时间(current)，转成时间
/* 
  time为传递的结束毫秒时间
*/
const pauseTime = (time: number) => {
  //天
  const days = Math.floor(time / DAY)
  //时
  const hours = Math.floor((time % DAY) / HOUR)
  //分
  const minutes = Math.floor((time % HOUR) / MINUTE)
  //秒
  const seconds = Math.floor((time % MINUTE) / SECOND)
  //毫秒
  const milliseconds = Math.floor(time % SECOND)
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: time
  }
}

const isSameSecond = (time1: number, time2: number) => {
  /* 
    SECOND = 1000毫秒
    这两个时间戳有多少秒,将这两个时间换算成秒
    这两个时间相同就是在同1秒
  */
  return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useTimeDown(options: UseCountDownOptions) {
  let rafId: number
  let counting: boolean  //是否已经开始计时
  let endTime: number  //倒计时结束的时间戳
  const remain = ref(options.time)  //需要倒计时多久
  const current = computed(() => pauseTime(remain.value))  //当前时间,通过方法pauseTime计算

  //----暂停计时
  const pause = () => {
    counting = false
    /* 
      cancelRAF是cancelRequestAnimationFrame函数
               是停止计时回调函数
    */
    cancelRAF(rafId)
  }

  //----计算时间差, 当前时间距离结束时间还剩多长时间
  /* 
    结束时间-当前时间 = 剩余时间
    需要判断时间差为0时,取最小值为0
  */
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0) //计算时间差,距离结束时间的毫秒数

  const setRemain = (value: number) => {
    /* 
      remain值发生改变
      当remain值发生改变时，调用onChange方法
      options.onChange?.()表示是可选的
    */
    remain.value = value
    options.onChange?.(current.value)

    /* 
      判断当前时间是否为0
      如果为0就暂停，不执行
      options.onFinish?.()表示是可选的
    */
    if (value === 0) {
      pause() //暂停倒计时
      options.onFinish?.()
    }
  }

  const microTick = () => {
    /* 
      rAF是requestAnimationFrame函数
         是一个定时器回调函数
    */
    rafId = rAF(() => {
      //判断有没有超过1秒,如果过了1秒就设置remain的值
      if (counting) {
        const remainRemain = getCurrentRemain() //获取当前需要倒计时的时间
        //改变remain的值
        setRemain(remainRemain)

        if (remain.value > 0) {
          //递归调用microTick，循环
          microTick()
        }
      }
    })
  }

  const macroTick = () => {
    /* 
      rAF是requestAnimationFrame函数
         是一个定时器回调函数
    */
    rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain() //获取当前需要倒计时的时间
        /*
          判断剩余的时间 & 想要倒计时的时间是不是在同1秒
          如果不在同1秒,就去设置remainRemain时间

          remainRemain当前剩余的时间
          remain.value想要倒计时的时间
        */
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          //改变remain的值
          setRemain(remainRemain)
        }

        if (remain.value > 0) {
          //递归调用macroTick，循环
          macroTick()
        }
      }
    })
  }

  //计时的方法
  const tick = () => {
    if (options.millisecond) {
      //有毫秒时间的倒计时
      microTick()
    } else {
      //非毫秒时间的倒计时
      macroTick()
    }
  }

  //开始计时
  const start = () => {
    if (!counting) {
      //如果没有在计时的时候，设置结束时间
      endTime = Date.now() + remain.value
      counting = true
      tick()
    }
  }

  const reset = (totalTime: options.time) => {
    //暂停计时
    pause()
    //重置remain的值
    remain.value = totalTime
  }

  return {
    start,
    pause,
    reset,
    current
  }
}