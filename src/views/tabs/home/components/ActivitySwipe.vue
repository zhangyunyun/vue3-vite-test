<script setup lang="ts">
import type { IActivities } from '@/types'
interface IProps {
  activitiesList: IActivities[]
}
defineProps<IProps>()
</script>

<template>
  <div class="home-activitySwipe">
    <div class="home-activitySwipe__scroll">
      <van-swipe class="notice-swipe" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in activitiesList" :key="index">
          <img :src="item.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-activitySwipe {
  width: 170px;
  height: 170px;
  padding-left: 10px;
  border-radius: 8px;
  overflow: hidden;

  &__scroll {
    position: relative;

    img {
      width: 100%;
      height: 170px;
      border-radius: 8px;
    }
  }
}

.van-notice-bar {
  background: none !important;
  padding: 0 !important;
  height: 170px !important;
}
</style>
