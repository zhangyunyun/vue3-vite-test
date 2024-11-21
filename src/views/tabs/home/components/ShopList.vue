<script setup lang="ts">
  import { ref } from 'vue'
  import type { IShop } from '@/types'

  import { reqShopList } from '@/api/shop.ts'

  import OpList from '@/components/list/OpList'

  const page = 1
  const shopList = ref([] as IShop[])
  const loading = ref(false)
  const finished = ref(false)

  const onload = async () => {
    loading.value = true
    //请求数据
    const { data, total} = await reqShopList({
      _page:page,  //当前第几页 
      _limit:5   //每一页显示几条数据,默认5条
    })
    shopList.value.push(...data)
    loading.value = false

    if(shopList.value.length >= total){
      //如果数据列表的条数大于总条数，表示数据加载完了
      finished.value = true
    }
  }
</script>

<template>
  <div class="home-shop-list">
    <OpList 
      v-model:loading="loading" 
      :finished="finished" 
      finished-text="没有更多了" 
      @load="onload">
      <div v-for="item in shopList" :key="item.id">
        {{ item.shopName }}
      </div>
    </OpList>
  </div>
</template>

<style lang="scss" scoped>
.home-shop-list {
  padding: 8px 10px;
}
</style>
