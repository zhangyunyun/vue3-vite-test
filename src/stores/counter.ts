import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  //相当于state初始数据
  state:() => {
    return{
      count:1,
    }
  },
  getters:{
    doubleCount:(state) => {
      return state.count * 2
    }
  },
  actions:{
    increment(){
      this.count++
    },
    decrement(){
      this.count--
    }
  }
})