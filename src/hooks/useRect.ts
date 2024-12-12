/*
  --1.获取元素的信息
  --2.设置元素可视区域位置
  --3.ClientRect中的四个属性（left,top,right,bottom,x,y,width,height)
      可以构成矩形盒子左上角和右下角的坐标，都是以视口（应该说是可是区域）的左上角为原点（0,0）
*/

import type { Ref } from 'vue'
import { unref } from 'vue'

const isWindow = (val:unknown) => val === Window

function makeDomRect(width:number,height:number){
  return {
    top:0,
    left:0,
    right:width,
    bottom:height,
    width,
    height
  }
}

export function useRect(elementOrRef: Element | Window | Ref<Element | Window>){
  const element = unref(elementOrRef)

  /*
    判断ref元素是不是window,window没有getBoundingClientRect()这个方法
    如果是window直接获取window的innerWidth，innerHeight
  */
  if(isWindow(element)){
    //获取元素的信息(如，宽、高、尺寸...)
    const { innerWidth, innerHeight } = element as Window
    return makeDomRect(innerWidth, innerHeight)
  }

  /* 
    判断ref元素是不是element
    如果是element使用getBoundingClientRect()获取元素信息
  */
  if((element as Element).getBoundingClientRect){
    return (element as Element).getBoundingClientRect()
  }

  /* 如果都不是就默认传为 0,0 */
  return makeDomRect(0,0)
}