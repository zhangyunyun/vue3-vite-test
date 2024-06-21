<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { RouterView, useRoute, useRouter} from 'vue-router'
  // import { Tabbar, TabbarItem } from 'vant'
  
  const route = useRoute()
  const router = useRouter()
  //记录当前选择的tab
  const active = ref(route.name as string)
  //导航自定义图标
  const icon = {
    active:'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png',
    inactive:'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'
  }

  //监听当前选择的路由
  watch(active, (nv) => {
    router.push({
      name:nv
    })
  })
  // userRouter.push(
  //   {
  //     name:'home',
  //     params:{
  //       name: 'dx',
  //       age: 18
  //     }
  //   }
  // )

</script>

<template>
  <div class="tab">
    <RouterView></RouterView>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="order" icon="bars" badge="20">订单</van-tabbar-item>
      <van-tabbar-item name="mine" icon="contact">我的</van-tabbar-item>
      <!-- 自定义 -->
      <van-tabbar-item name="test">
        <span>测试</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
  
</style>