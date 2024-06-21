/*
 * @Author: v3-vite-test 876023825@qq.com
 * @Date: 2023-05-18 09:28:00
 * @LastEditors: v3-vite-test 876023825@qq.com
 * @LastEditTime: 2023-09-11 15:02:51
 * @FilePath: \v3-vite-test\src\stores\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
/* 
  main 可以是useMain useUser、useCart 之类的名字 
  defineStore('main',{..}) 在devtools 就使用 main 这个名
*/
export const useMain = defineStore('main',{
   // 相当于state
   state:() => {
      return {
         //所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
         counter:0,
         name:'Pinia'
      }
   },

   //相当于计算属性
   getters:{
      doubleCount:(state) => {
         return state.counter * 2
      }
   },

   //相当于vuex的 mutation + action，可以同时写同步和异步的代码
   actions:{
      increment(){
         this.counter++
      },
      randomizeCounter(){
         setTimeout(() => {
            this.counter = Math.round(100 * Math.random())
         }, 0);
      }
   }
})

