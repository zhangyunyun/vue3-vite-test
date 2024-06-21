<script setup lang="ts">
interface IProps{
   loading:Boolean,
   type:'loading' | 'skeleton'
}
defineProps<IProps>()
</script>

<template>
   <div v-if="loading" class="op-loading-view">
      <slot name="actionLoad">
         <div v-if="type === 'loading'" class="loading-wrapper">
            <van-loading type="spinner">加载中...</van-loading>
         </div>
         <div v-if="type === 'skeleton'" class="skeleton-wrapper">
            <van-skeleton title :row="10" />
            <van-skeleton title avatar :row="5" />
            <van-skeleton avatar :row="5" />
            <!--<van-skeleton title avatar :row="3" />
            <van-skeleton title avatar :row="3" />-->
         </div>
      </slot>
   </div>
   <slot v-else></slot>
</template>

<style lang="scss" scoped>
.op-loading-view{
   .loading-wrapper{
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px 10px;
      height:100px;
   }
   .skeleton-wrapper{
      padding:20px 10px;
   }
}
</style>