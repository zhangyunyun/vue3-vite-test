<script setup lang="ts">
import { ref } from 'vue'
//哈哈，测试请求接口函数是否请求成功
// import { reqTestData }  from '@/api/test.ts'
// reqTestData()

import type { IHomeInfo } from '@/types'

import { useToggle } from '@/hooks/useToggle.ts'
import { useAsync } from '@/hooks/useAsync.ts'
//求函数请方法引入
import { reqHomePageData } from '@/api/home.ts'
//当前页面的配置文件
import { PRIMARY_COLOR, TRANSPARENT } from '@/config/index'
//当前页面模块的配置文件
import { HOME_TABS } from './config'
//公用组件 
import OpLoadingView from '@/components/OpLoadingView.vue'
//子组件
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'
import TimesDown from './components/TimesDown.vue'
import ActivitySwipe from './components/ActivitySwipe.vue'
//搜索组件
import SearchView from '@/views/search/SearchView.vue'

//后台图片的本地地址
const fileURLToPath = ref('http://127.0.0.1:8000/')
//搜索切换
const [searchViewIsShown, searchViewToggle] = useToggle(false)
//标签列表(模拟的数据，真实数据调接口)
/*const recomments = [
  {
    value:1,
    label:'牛腩'
  },
  {
    value:2,
    label:'色拉'
  },
  {
    value:3,
    label:'咖啡'
  },
  {
    value:4,
    label:'标签'
  }
]*/
//首页数据
const { pending, data } = useAsync(reqHomePageData, {} as IHomeInfo)
//tab选中当前第一个
const active = ref(0)
const tabBackgroundColor = ref(TRANSPARENT)
const onTabScroll = ({isFixed}:{isFixed:Boolean}) => {
  tabBackgroundColor.value = isFixed ? 'white' : TRANSPARENT
}
</script>

<template>
  <div class="home-page">
    <!-- 搜索隐藏层-搜索 -->
    <transition name="fade">
      <SearchView v-if="searchViewIsShown" @cancel="searchViewToggle"></SearchView>
    </transition>
    <div v-if="!searchViewIsShown">
      <!-- 首页头部-搜索 -->
      <!-- <TheTop :recommentsList="data.searchRecommends" @searchClick="searchViewToggle"></TheTop> -->
      <TheTop :searchRecommendList="data.searchRecommends" @searchClick="searchViewToggle"></TheTop>
      <OpLoadingView :loading="pending" type="skeleton">
        <!--插槽内 自定义loading-->
        <!--<template #actionLoad>
            <div>
              加载中...
            </div>
        </template>-->
        <!-- 列表banner -->
        <div class="home-banner">
          <a-carousel autoplay>
            <div v-for="(item, index) in data.banner" :key="index">
              <img :src="fileURLToPath + item.imgUrl" />
            </div>
          </a-carousel>
        </div>
        <!-- 导航 -->
        <TheTransformer :transformerList="data.transformer"></TheTransformer>
        <!-- 公告 -->
        <ScrollBar :scrollBarInfoList="data.scrollBarInfo"></ScrollBar>
        <!-- 活动 -->
        <div class="home-page__activity">
          <TimesDown :countDownData="data.countdown" />
          <ActivitySwipe :activitiesList="data.activities" />
        </div>
        <!--导航-->
        <van-tabs class="home-page__tabBar"
        sticky 
        offset-top="50px"
        :color="PRIMARY_COLOR"
        :background="tabBackgroundColor"
        animated 
        v-model:active="active"
        @scroll="onTabScroll">
          <van-tab v-for="v in HOME_TABS" :key="v.value" :title="v.title">
            <component :is="v.component"></component>
          </van-tab>
        </van-tabs>
        <!-- <div class="home-page__tabCont"> 
          
        </div> -->
      </OpLoadingView>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.home-page {
  padding-bottom: 70px;

  &__banner {
    a {
      display: block;
      height: 100px;
      width: 100%;
    }

    img {
      display: block;
      height: 100px;
      width: 100%;
      padding-top: 10px;
    }
  }
}

.home-page__activity {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.home-page__tabBar {
  margin-top: 10px;
  .tabBackground {
    .van-tabs__nav {
      background: rgba(255, 255, 255, 1) !important;
    }
  }

  .van-tabs__nav {
    background: rgba(244, 244, 244, 1) !important;
  }
}

.home-page__tabCont{
  background:#fff;
}
</style>
