<script setup lang="ts">
import type { ICountdown } from '@/types'
import { useTimeDown } from '@/hooks/useTimeDown.ts'
interface IProps {
  countDownData: ICountdown
}
//获取父组件传递过来的时间值
const props = defineProps<IProps>()
const time = props.countDownData.time
//字符串长度为2,填充的前面数字为0
const setNum = (num: number) => {
  return num.toString().padStart(2, '0')
}
//自定义倒计时调用
const timeDown = useTimeDown({
  time,
  millisecond: false
})
console.log(timeDown)
//开始计时
timeDown.start()
const { current } = timeDown
console.log(current)

//vant组件倒计时时间
// const time = ref(30 * 60 * 60 * 1000)
</script>

<template>
  <div class="home-countdown">
    <div class="home-countdownInner">
      <div class="home-countdownInner__info">
        <img class="logo" src="@/assets/imgs/index_page/count-down.png" />
        <!--自定义倒计时-->
        <span class="number hour">{{ setNum(current.hours) }}</span>
        <span class="colon">:</span>
        <span class="number minute">{{ setNum(current.minutes) }}</span>
        <span class="colon">:</span>
        <span class="number second">{{ setNum(current.seconds) }}</span>

        <!--vant组件倒计时-->
        <!-- <van-count-down :time="time" class="timeDown">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down> -->
      </div>
      <div class="home-countdownInner__goods">
        <img class="goods-img" :src="countDownData.goods.imgUrl" />
        <div class="goods-name op-ellipsis">{{ countDownData.goods.name }}</div>
        <div class="goods-price">
          <span class="goods-price__now">
            ￥<span>{{ countDownData.goods.price }}</span>
          </span>
          <span class="goods-price__old">￥{{ countDownData.goods.oldPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-countdown {
  width: 180px;
  height: 170px;
  border-radius: 8px;
  background: linear-gradient(to bottom, rgb(252, 202, 202), white, white, white);

  .home-countdownInner {
    padding: 10px 10px;

    &__info {
      display: flex;
      align-items: center;

      .logo {
        width: 80px;
        margin-right: 8px;
      }

      .number {
        font-size: 12px;
        background: rgb(252, 78, 78);
        color: white;
        padding: 2px;
        border-radius: 2px;
        width: 50px;
        font-weight: bold;
        text-align: center;
      }

      .colon {
        margin: 0 1px;
        color: red;
      }
    }

    &__goods {
      margin-top: 8px;

      .goods-img {
        width: 160px;
        height: 74px;
        margin-bottom: 4px;
      }

      .goods-name {
        width: 160px;
      }

      .goods-price {
        align-items: baseline;
        font-size: 12px;

        &__now {
          color: #000;
          margin-right: 4px;

          span {
            font-weight: bold;
            font-size: 16px;
          }
        }

        &__old {
          text-decoration: line-through;
        }
      }
    }
  }

  /* 组件倒计时 */
  .timeDown {
    display: flex;
    flex-wrap: nowrap;

    .colon {
      display: inline-block;
      margin: 0 2px;
      color: #000;
    }

    .block {
      display: inline-block;
      width: 20px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      background-color: #333;
      border-radius: 3px;
    }
  }
}
</style>
