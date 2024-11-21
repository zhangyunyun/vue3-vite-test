<script setup lang="ts">
import { ref, onMounted} from 'vue'
import type { IScrollBarInfo } from '@/types'
import { useInterval } from '@/hooks/useInterval'
// import { useTimeout } from '@/hooks/useTimeout'
/*
  ? 这里的?表示可选的
  withDefaults设置props的默认值
*/
interface IProps{
  intervalTime?:number,  //元素展示的时间
  transitionTime?:number, //元素滚动切换的时间
  height?:number,  //组件的高度 
  scrollBarInfoList:IScrollBarInfo[]  //滚动的信息内容
}
const props = withDefaults(defineProps<IProps>(),{
  intervalTime:3000,
  transitionTime:1000,
  height:40
})
const heightPx = `${props.height}px`
const containerRef = ref() 

const scrollBar = () => {
  const container = containerRef.value  //获取到containerRef标识的dom元素节点
  const count = container.children.length  //获取dom元素下的子元素的个数
  const firstSwipeItem = container.children[0] //获取dom元素下第一个元素
  const containerHeight = count * props.height  //dom元素滚动的总高度(子元素的个数 * 一个子元素的高度)
  container.style.height = `${containerHeight}px` //设置高度
  let index = 0  //滚动元素,滚动到第几个
  useInterval(() => {
    index++
    //如果index超过item的个数，将第一个元素接到最后一个元素后面
    if(index >= count){
      firstSwipeItem.style.transform = `translateY(${index * props.height}px)`
      //如果第一个元素滚动结束之后，将整个container位置重置
      const timeout = setTimeout(() => {
        //重置逻辑，就是将当前设置的样式复原
        firstSwipeItem.style.transform = ''
        container.style.transform = ''
        container.style.transition = ''
        clearTimeout(timeout)
      },props.transitionTime)
    }
    container.style.transform = `translateY(-${index * props.height}px)`
    container.style.transition = `all linear ${props.transitionTime}ms`
    index = index % count  //循环，是否超过了容器里子元素的个数
  },props.intervalTime)
}

const setColor = () => {
  const container = containerRef.value  //获取到containerRef标识的dom元素节点
  const childs = container.children //获取dom元素下的子元素
  const color = ['#fca43c','#fc4419','#35c8fa']
  for(let i=0; i<childs.length; i++){
    const child = childs[i].children[0].children[1].children[0].children
    for(let j=0; j<child.length; j++){
      child[j].style.color = color[i]
    }
  }
}

onMounted(() => {
  scrollBar()
  setColor()
})

</script> 

<template>
  <div class="home-scroll-bar">
    <!-- 自定义切换  -->
    <div class="home-scroll-bar__swipe">
      <div ref="containerRef">
        <div class="swipe-item" v-for="(item, index) in scrollBarInfoList" :key="index">
          <div class="scroll-bar__info" :class="`scroll-bar__info__${item.type}`">
            <div class="info-badge"><div>{{item.badge}}</div></div>
            <div class="info-detail" id="info-detail"><div v-html="item.detail"></div></div>
            <div class="info-btn"><div class="op-thin-border">{{item.btn}}</div></div>
          </div>    
        </div>
       <!-- <div class="swipe-item">
          <div class="scroll-bar__info scroll-bar__info__hongbao">
            <span class="info-badge">红包</span>
            <span class="info-detail">你有<span class="info-num">4</span>张总<span class="info-num">43.5</span>元红包即将到期</span>
            <span class="info-btn op-thin-border">去查看</span>
          </div>
        </div> -->
      </div>  
    </div>
    <!-- 使用vant组件切换 -->
    <!-- <div class="home-scroll-barNew">
      <van-notice-bar :scrollable="false">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :touchable="false"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(item, index) in scrollBarInfoList" :key="index">
            <div class="scroll-bar__info" :class="`scroll-bar__info__${item.type}`">
              <div class="info-badge"><div>{{item.badge}}</div></div>
              <div class="info-detail"><div v-html="item.detail"></div></div>
              <div class="info-btn"><div class="op-thin-border">{{item.btn}}</div></div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div> -->
  </div>
</template> 

<style lang="scss" scoped>
.van-notice-bar{
  padding:0 5px;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
/*自定义样式*/
.home-scroll-bar {
  --bean-color: rgb(252, 164, 40);
  --hongbao-color: rgb(252, 68, 25);
  --youhuiquan-color: rgb(53, 200, 250);
  margin-top:10px;
  padding:0 10px;
  &__swipe {
    background: white;
    border-radius: 8px;
    font-size: 13px;
    position: relative;
    overflow: hidden;
    height: v-bind(heightPx);
    .swipe-item {
      height: v-bind(heightPx);
      display:flex;
      align-items:center;
      padding:5px;
    }
  }
  .scroll-bar__info {
    display: table;
    table-layout:fixed;
    width:100%;
    .info-badge,.info-detail,.info-btn{
      display:table-cell;
      position:relative;
      vertical-align:middle;
    }
    .info-badge {
      width:50px;
      div{
        border-radius: 5px;
        padding:0 2px;
        color: white;
        margin-right: 6px;
        font-size: 12px;
        text-align:center;
      }
    }
    .info-detail{
      div{
        flex: 1;
        span.info-num {
          font-weight: bold;
          margin: 0 2px;
        }
      }
    }
    .info-btn {
      width:70px;
      div{
        padding: 3px 14px;
        font-size: 12px;
        width:70px;
        height:28px;
        line-height:22px;
        &.op-thin-border:before {
          border-radius: 50px;
        }
      }
    }

    &__bean {
      .info-badge {
        div{
          background: var(--bean-color);
        }
      }
      .info-btn {
        div{
          color: var(--bean-color);
          &:before {
            border-color: var(--bean-color);
          }
        }
      }
      #info-detail{
        div{
          span.info-num {
            color: var(--bean-color);
          }
        }
      }
    }

    &__hongbao {
      .info-badge {
        div{
          background: var(--hongbao-color);
        }
      }
      .info-btn {
        div{
          color: var(--hongbao-color);
          &:before {
            border-color: var(--hongbao-color);
          }
        }
      }
      #info-detail{
        div{
          span.info-num {
            color: var(--hongbao-color);
          }
        }
      }
    }

    &__youhuiquan {
      .info-badge {
        div{
          background: var(--youhuiquan-color);
        }
      }
      .info-btn {
        div{
          color: var(--youhuiquan-color);
          &:before {
            border-color: var(--youhuiquan-color);
          }
        }
      }
      #info-detail{
        div{
          span.info-num {
            color: var(--youhuiquan-color);
          }
        }
      }
    }
  }
}
/*vant样式*/
/*.home-scroll-barNew{
  --bean-color: rgb(252, 164, 40);
  --hongbao-color: rgb(252, 68, 25);
  margin-top:10px;
  padding:0 10px;
  &__swipe{
    background: white;
    border-radius: 8px;
    font-size: 13px;
    position: relative;
    overflow: hidden;
    height: 40px;
  }
  .scroll-bar__info{
    display: table;
    table-layout:fixed;
    width:100%;
    .info-num {
      font-weight: bold;
      margin: 0 2px;
    }

    .info-badge,.info-detail,.info-btn{
      display:table-cell;
      position:relative;
      vertical-align:middle;
    }

    .info-badge{
      width:45px;
      div{
        display:inline-block;
        border-radius: 5px;
        padding: 2px 6px;
        color: white;
        font-size:12px;
        height:20px;
        line-height:16px;
      }
    }

    .info-detail{
      div{
        color:#333;
      }
      .info-num{
        font-weight:bold;
      }
    }

    .info-btn{
        width:70px;
        div{
          padding: 3px 14px;
          font-size: 12px;
          width:70px;
          height:30px;
          line-height:26px;
          &.op-thin-border:before {
            border-radius: 50px;
          }
        }
    }

    &__bean {
      .info-badge {
        div{
          background: var(--bean-color);
        }
      }
      .info-btn {
        div{
          color: var(--bean-color);
          &:before {
            border-color: var(--bean-color);
          }
        }
      }
      .info-num {
        span{
          color: var(--bean-color);
          border-color: var(--bean-color);
        }
      }
    }

    &__hongbao {
      .info-badge {
        div{
          background: var(--hongbao-color);
        }
      }
      .info-btn {
        div{
          color: var(--hongbao-color);
          &:before {
            border-color: var(--hongbao-color);
          }
        }
      }
      .info-num {
        span{
          color: var(--hongbao-color);
          border-color: var(--hongbao-color);
        }
      }
    }
  }
}*/
</style>