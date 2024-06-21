<script setup lang="ts">
// import { ref } from 'vue'
import type { ISearchRecommend } from '@/types'
import OpSearch from '@/components/OpSearch.vue'

//props接收的数据的类型声明
interface IProps{
  // searchRecommendList:{
  //   value:Number,
  //   label:String
  // }[]
  searchRecommendList:ISearchRecommend[]
}
//使用DefineProps定义组件的Props
defineProps<IProps>()

//emits接收的事件 
interface IEmits{
  (e:'searchClick') : void,
}
const emits = defineEmits<IEmits>()

/* 
  情况一 使用vant的search组件
  const value = ref('')
  const onSearch = (val) => {
    return val
  }
  const onClickButton = () => {
    console.log(searchValue.value)    
    //showToast(searchValue.value)
  } 
*/

/* 
  情况二 自定义搜索框
  const searchValue = ref('')
  
  const onSearch = (v?:string | number) => {
    console.log(v)
  }

  const onCancel = () => {
    console.log("====cancel")
  }W

  const onClear = () => {
    console.log("====clear")
  }
*/

/* 
  情况三 使用hooks
*/

</script>

<template>
  <div class="home-top">
    <!-- 定位地址 -->
      <div class="top">
        <img class="location-icon" src="@/assets/imgs/index_page/location.png" />
        <div class="location">幸福小区(北一区东南门)</div>
        <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png" />
        <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
      </div>
      <!--情况一 vant搜索框 -->
      <!-- <van-search 
        v-model="value" 
        shape="round" 
        show-action
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))" 
        placeholder="请输入搜索关键词" 
        @search="onSearch"
      >
        <template #actionBtn>
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search> -->

      <!--情况二 自定义搜索框 search cancel是父组件传递给子组件的方法，需要子组件中调用触发-->
      <!-- <OpSearch 
        v-model="searchValue"
        show-action="showAction"
        shape="round"
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="请输入搜索关键词"
        @search="onSearch"  
        @cancel="onCancel"
        @clear="onClear"
       >
        <template #right-icon>
          <div @click="emits('searchClick')">搜索</div>
        </template>
      </OpSearch>-->
      <!-- 情况三 hooks-useToggle实现搜索页展示 -->
      <VanSticky>
        <OpSearch 
          shape="round"
          background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
          placeholder="请输入搜索关键词"
          @inputClick="emits('searchClick')">
          
          <template #right-icon>
            <div @click="emits('searchClick')">搜索</div>
          </template>
        </OpSearch>
      </VanSticky>

      <!-- 搜索关键字列表 -->
      <div class="search-recommend">
        <div class="tag" v-for="(item, index) in searchRecommendList" :key="index">{{item.label}}</div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.home-top {
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: white;
  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;
    .location-icon {
      width: 20px;
      height: 20px;
    }
    .location {
      flex: 1;
    }
    .shopcart-icon {
      width: 24px;
      height: 24px;
    }
    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }
  .search-recommend {
    display: flex;
    padding: 0 10px 8px;
    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
/* 重写样式 */
.home-top{
  .van-search__action{
    color:#fff;
  }
}
</style>
