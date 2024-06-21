/*
 hook隐藏显示切换
*/
import type { Ref } from 'vue'
import { ref } from 'vue' 
/* 
   默认值  initState 
   state状态值 Ref<Boolean>  
   toggle切换状态值的函数 () => void  
*/
export function useToggle(initState:Boolean):[Ref<Boolean>, () => void]{
   const state = ref(initState)
   const toggle = function(){
      state.value = !state.value  
   }
   return [state, toggle]
}