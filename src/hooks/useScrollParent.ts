// import { ScrollElement } from 'vant/es/utils' //vant插件中配置的
import type { Ref } from 'vue'
import { ref, onMounted } from 'vue'

type ScrollElement = HTMLElement | Window //自定义的
const defaultRoot = window
const overflowScrollReg = /scroll|auto|overlay/i //正则,包含这些字段就是滚动元素

const isElement = (node:Element) =>{
  //根据属性字段(nodeType)判断DOM结构是不是节点类型
  const ELEMENT_NODE_TYPE = 1
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE
}

const getScrollElement = (el:Element, root:ScrollElement) => {
  let node = el
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node)
    //如果有这个节点就返回这个节点
    if(overflowScrollReg.test(overflowY)){
      return node
    }
    //如果没有就往上一级找(父元素或爷爷元素)
    node = node.parentNode as Element
  }
  return root
}

export function useScrollParent(el:Ref<Element>,root:ScrollElement = defaultRoot){
  //scrollParent是一个dom结构
  const scrollParent = ref()

  //这个DOM结构是在div挂载之后才能找到
  onMounted(() => {
    if(el.value){
      scrollParent.value = getScrollElement(el.value,root)
    }
  })

  return scrollParent
}