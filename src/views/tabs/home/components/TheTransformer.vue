<script setup lang="ts">
import type { ITransformer } from '@/types'
interface IProps{
   transformerList:ITransformer[]
}
defineProps<IProps>()
</script>

<template>
  <div class="home-transformer">
    <div class="home-transformer__item" v-for="(item,index) in transformerList" :key="index">
      <img :src="item.imgUrl" />
      <div class="label">{{item.label}}</div>
    </div>
  <!--<div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon2.png" />
      <div class="label">超市便利</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon3.png" />
      <div class="label">美食团购</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon4.png" />
      <div class="label">丽人/医美</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon5.png" />
      <div class="label">休闲玩乐</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon6.png" />
      <div class="label">下午茶</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon7.png" />
      <div class="label">水果</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon8.png" />
      <div class="label">鲜花绿植</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon9.png" />
      <div class="label">买菜</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon10.png" />
      <div class="label">甜品饮品</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon11.png" />
      <div class="label">全城购</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon12.png" />
      <div class="label">送药上门</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon13.png" />
      <div class="label">天天赚现金</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon14.png" />
      <div class="label">冲吧饿小宝</div>
    </div>
    <div class="home-transformer__item">
      <img src="@/assets/imgs/index_page/transformer-icon15.png" />
      <div class="label">0元领水果</div>
    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.home-transformer{
  display: grid;
  grid-template-columns: repeat(5, 1fr); //一行5列平均等分
  padding:5px 10px;
  &__item {
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    margin:5px 0;
    img {
      margin:0 auto;
      width:40px;
    }
    .label{
      margin-top:5px;
    }
  }
}
</style>
