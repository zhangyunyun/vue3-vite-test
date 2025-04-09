/*
 * @Description  : 请好好写代码
 * @verdion      : 
 * @Author       : yunyunzhang
 * @Date         : 2025-01-13 11:47:15
 * @LastEditors  : yunyunzhang
 * @LastEditTime : 2025-01-13 15:27:54
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id:'user',
  state:() => ({
    userInfo:{}
  }),
  actions:{
    getUser(){
      
    }
  }
})
