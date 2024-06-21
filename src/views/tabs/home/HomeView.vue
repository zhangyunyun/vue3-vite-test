<script setup lang="ts">
//哈哈，测试请求接口函数是否请求成功
// import { reqTestData }  from '@/api/test.ts'
// reqTestData()

//reqSearchData('比萨')
import type { IHomeInfo } from '@/types'

// import PRIMARY_COLOR from '@/config'

import { useToggle } from '@/hooks/useToggle.ts'
import { useAsync } from '@/hooks/useAsync.ts'
//求函数请方法引入
import { reqHomePageData } from '@/api/home.ts'
//公用组件 
import OpLoadingView from '@/components/OpLoadingView.vue'
import SearchView from '@/views/search/SearchView.vue'
//子组件
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'
import TimesDown from './components/TimesDown.vue'
import ActivitySwipe from './components/ActivitySwipe.vue'

//后台图片的本地地址
const fileURLToPath = ref('http://127.0.0.1:8000/')
//搜索切换
const [searchViewIsShown, searchViewToggle] = useToggle(false)
//标签列表
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
//tab背景class是否显示
const isShow = ref(false)
</script>

<template>
  <div class="home-page">
    <!-- 搜索隐藏层-搜索 -->
    <transition name="fade">
      <SearchView v-if="searchViewIsShown" @cancel="searchViewToggle"></SearchView>
    </transition>
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
      <van-tabs scrollspy sticky offset-top="54px" class="home-page__tabBar" :class="{ tabBackground: isShow }">
        <van-tab title="标签1">内容1</van-tab>
        <van-tab title="标签2">内容2</van-tab>
        <van-tab title="标签3">内容3</van-tab>
      </van-tabs>
      <div>
        {{ data }}
      </div>
    </OpLoadingView>
    <!--{{ pending }}
        {{ data }}-->
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
}

.home-page__tabBar {
  .tabBackground {
    .van-tabs__nav {
      background: rgba(255, 255, 255, 1) !important;
    }
  }

  .van-tabs__nav {
    background: rgba(244, 244, 244, 1) !important;
  }
}
</style>
