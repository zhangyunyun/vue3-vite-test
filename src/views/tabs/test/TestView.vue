<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { ref, reactive, UnwrapRef} from 'vue'
import { useRoute, useRouter } from 'vue-router'
//引入想要的pinia文件,里面就是对应导出的名字
import { storeToRefs } from 'pinia'
import { useMain } from '@/stores/index'

//hooks文件
import { useCountDown } from '@/hooks/useCountDown.ts'

//引入请求接口函数
import { reqTestData } from '@/api/test'
//import { reqCommodity } from '@/api/test'

//***引入
//import * as echarts from 'echarts'
const testTxt = ref()
const loading = ref(false)
const num = ref(4)
const noMore = computed(() => count.value >= 10)
const disabled = computed(() => loading.value || noMore.value)
const activeKey = ref('1')
let tabTitleList = reactive([])
let tabContsList = reactive([])

onMounted(() => {
  //testC()

  getTest()
  //getList()
})

const testA = () => {
  const a = ref(1)
  a.value = 2
  console.log('a的值------->',a)
  console.log('a.value的值------->',a.value)
  return a
}
const resultA = testA()

const testB = () => {
  const b = ref({ name: 'vue3' })
  b.value = { name: 'vite' }
  console.log('b的值------->',b)
  console.log('b.value的值------->',b.value)
  return b
}
const resultB = testB()

const obj = {
  number1:ref(111)
}
// 将 count 改成顶层属性
const { number1 } = obj



//--pinia 获取状态存储的数据
const main = useMain()
let { name, counter, doubleCount } = storeToRefs(main)
counter = '999'
const change = () => {
  main.$patch((state) => {
    state.counter += 10
    state.name = '修改为张三'
  })
}

//--axios请求后台(jsonServer)测试数据
const getTest = async() => {
  //reqTestData().then(res => {
    //console.log(res)
    //testTxt.value = res.desc
  //})
  const { desc } = await reqTestData()
  testTxt.value = desc
}

/*const load = () => {
  loading.value = true
  setTimeout(() => {
    num.value += 4
    loading.value = false
  }, 2000);
}

const getList = async() => {
  let result = await reqCommodity()
  console.log(result)
  result.map(item => {
    tabTitleList.push(item.categoryName)
    tabContsList.push(item.goods)
  })
  console.log(tabTitleList)
  console.log(tabContsList)
}*/

//倒计时
const { count, countDown } = useCountDown()
console.log(useCountDown())
</script>

<template>
<div class="home">
  <h2 class="title">0.ref</h2>
  <div class="content">
     <h3 class="titleSub">1.ref 对象是可更改的</h3>
     <div>{{ resultA }}</div>
     <h3 class="titleSub">2.ref 对象是响应式的</h3>
     <div>{{ resultB }}</div>
     <h3 class="titleSub">3.ref改为顶层属性自动解包</h3>
     <div>
        <p>① {{ obj.number1 + 1}}</p> 
        <p>注：obj.number1是一个ref对象</p>
     </div>
     <div>② {{ number1 + 1 }}</div>
     <h3 class="titleSub">4.ref嵌套在一个响应式对象中解包</h3>
     <div>{{}}</div>
  </div>
  <h2 class="title">1.Pinia</h2>
  <div class="content">
    <div>名称:{{name}}</div>
    <div>计数(counter):{{counter}}个</div>
    <div>双倍计数(doubleCount):{{doubleCount}}</div>
    <button class="btn" @click="change">change</button>
    <button class="btn" @click="main.increment()">counter++</button>
  </div>
  <h2 class="title">2.axios</h2>
  <div class="testBox">
    <p>{{testTxt}}</p>
  </div>
  <div class="proBox">
    <!-- <ul class="proTab">
      <li>tab1</li>
      <li>tab2</li>
      <li>tab3</li>
    </ul>
    <ul class="proList">
      <li>
        <div class="listItem">
          <div class="listItem_lt">
            <img src="" alt="" />
          </div>
          <div class="listItem_ct">
            <h3>名称</h3>
            <p>描述</p>
          </div>
          <div class="listItem_rt">
            <button>转发</button>
          </div>
        </div>
      </li>
    </ul> -->
    <a-tabs @prevClick="callback" @nextClick="callback" default-active-key="0">
      <a-tab-pane v-for="(item,index) in tabContsList" :key="index" :tab="`${tabTitleList[index]}`">
        <div class="infinite-list-wrapper" style="overflow:auto">
          <div class="listItemList" 
            v-infinite-scroll="load" 
            infinite-scroll-disabled="disabled">
            <div class="listItem" v-for="(its,index) in item" :key="index">
              <div class="listItem_lt">
                <img :src="its.bussImg" alt="" />
              </div>
              <div class="listItem_ct">
                <h3>{{its.bussName}}</h3>
                <p>{{its.bussDesc}}</p>
              </div>
              <div class="listItem_rt">
                <button>转发</button>
              </div>
            </div>
          </div>
          <p v-if="loading" class="text"><span>加载中...</span></p>
          <p v-if="noMore" class="text"><span>没有更多了哦~</span></p>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  <h2 class="title">3.配置Vant</h2>
  <div class="content">
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
  </div>
  <h2 class="title">4.push & replace</h2>
  <div class="testBox">
    <div>{{}}</div>
  </div>
  <h2 class="title" style="display:none;">5.echarts</h2>
  <div class="echartBox" style="display:none;">
    <div class="myCharts" id="myCharts"></div>
  </div>

  <h2 class="title">6.hooks倒计时</h2>
  <h3 class="titleSub">----倒计时60s</h3>
  <div class="countDownTime">
      <div class="countBox"><span @click="countDown(60)">{{count ? `${count}s后重新获取` : '获取验证码'}}</span></div>
  </div>
  <h3 class="titleSub">----倒计时天、时、分、秒</h3>
  <div class="countDownTime">
      <div class="timeDown">
        <span class="block">00天</span>
        <span class="colon">:</span>
        <span class="block">00时</span>
        <span class="colon">:</span>
        <span class="block">00分</span>
        <span class="colon">:</span>
        <span class="block">00秒</span>
      </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.home{
  padding:10px 10px 70px;
  .title{
    margin-top:15px;
    font-size:20px;
    font-weight:bold;
    &:first-child{
      margin-top:0;
    }
  }
  .titleSub{
    margin-top:15px;
    font-weight:bold;
  }
  .content{
    button.btn{
      margin:0 5px;
      color:#fff;
      background:#00a97a;
    }
  }
}
.testBox{
  margin-top:10px;
}
/* .proBox{
  margin-top:5px;
  .proTab{
    display: flex;
    align-items: center;
    justify-content: center;
    height:40px;
    line-height:40px;
    li{
      flex:1;
    }
  }
  .proList{
    display:flex;
    align-items: center;
    justify-content:center;
    li{
      flex:1;
      display:flex;
      align-items: center;
      justify-content:center;
    }
  }
} */
.proBox{
  margin-top:10px;
  .infinite-list-wrapper {
    height:200px;
  }
  p.text{
    margin-top:20px;
    text-align:center;
    color:#333;
    span{
      border-radius:5px;
      background:#ebebeb;
      padding:5px 10px;
    }
  }
  .listItem{
    margin:5px 0;
    display:table;
    table-layout:fixed;
    width:100%;
    &_lt,&_ct,&_rt{
      display:table-cell;
      position:relative;
      vertical-align:middle;
    } 
    &_lt{
      width:50px;
      img{
        display:block;
        width:50px;
      }
    }
    &_ct{
      h3{
        color:#333;
        font-size:15px;
      }
      p{
        color:#999;
        font-size:12px;
      }
    }
    &_rt{
      width:50px;
      button{
        font-size:14px;
        color:#fff;
        height:28px;
        line-height:26px;
        background:#00a97a;
      }
    }
  }
}

.echartBox{
  margin-top:5px;
  .myCharts{
    width:150px;
    height:150px;
  }
}

.countBox{
  span{
    width:120px;
    height:40px;
    line-height:40px;
    display:inline-block;
    padding:0 10px;
    font-size:.875rem;
    color:#fff;
    text-align:center;
    background:#07c160;
    border-radius:8px;
  }
}

.timeDown{
  display:flex;
  flex-wrap:nowrap;
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #000;
    font-size:.35rem;
    font-weight:bold;
  }
  .block {
    display: inline-block;
    width: 40px;
    color: #fff;
    font-size: 14px;
    font-weight:bold;
    text-align: center;
    background-color: #333;
    border-radius:3px;
  }
}
</style>
