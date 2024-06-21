<script setup lang="ts">
//---定义属性(数据类型)
interface IProps{
  showAction?:Boolean //是否显示
  background?:String, //搜索整体背景色
  shape?:String, //input圆角
  placeholder?:String, //默认显示的文本提示
  modelValue?:String | Number //输入的值
}
const props = defineProps<IProps>()

//----定义方法
interface IEmits{
  /* 
    void用来表示空
    void是可以指向任何类型的数据
  */
  (e:'search', v?: String | Number) : void  //搜索
  (e:'cancel') : void //取消搜索
  (e:'clear') : void  //清空文本框的值
  (e:'update:modelValue', v?: String | Number) : void //更新modelValue的值
  (e:'inputClick') : void
}
const emits = defineEmits<IEmits>()

//----定义事件
//input中按了回车键写响应处理
const onKeypress = (e:KeyboardEvent) => {
  // console.log(e)
  const ENTER_CODE = 13
  if(e.keyCode == ENTER_CODE){
    //禁止默认行为
    e.preventDefault()
    //触发事件
    emits('search',props.modelValue)
  }
}
//获取文本框键入的值赋给modelValue
const onInput = (e) => {
  // console.log(e.target.value)
  let val = e.target.value
  console.log(val)
  emits('update:modelValue',val)
}
//清空按钮清空input输入的值
const onClear = () => {
  console.log('clear')
  emits('update:modelValue','')
  emits('clear')
}

</script> 

<template>
  <div class="op-search" :class="{ 'op-search--show-action': showAction }" :style="{ background }">
    <div class="op-search__content">
      <div class="op-cell op-search__field">
        <div class="op-field__left-icon">
          <van-icon name="search" />
        </div>
        <div class="op-cell__value">
            <div class="op-field__body">
              <!-- modelValue的值就是文本框输入事件的值(e.target.value) -->
              <!-- <input 
                class="op-field__control"
                type="search"
                :value="modelValue" 
                :placeholder="placeholder"
                @keypress="onKeypress"
                @input="(e) => emits('update:modelValue', (e.target as HTMLInputElement).value)"> -->
              <input 
                class="op-field__control"
                type="search"
                :value="modelValue" 
                :placeholder="placeholder"
                @keypress="onKeypress"
                @input="onInput"
                @click="emits('inputClick')">
              <!-- 右侧的小图标，只有有right-icon时才显示 -->
              <div v-if="$slots['right-icon']" class="op-field__right-icon">
                <slot name="right-icon"></slot>
              </div>
              <!-- 清空 当right-icon没有的时候显示并且modelValue的值不为空 -->
              <van-icon v-else-if="modelValue" name="clear" class="op-field__clear" @click="onClear" />
            </div>
        </div>
      </div>
    </div>
    <div v-if="showAction" class="op-search__action">
      <!-- action没有传入其他标签的时候，默认显示取消按钮标签部分 -->
      <slot name="actionBtn">
        <div @click="emits('cancel')">取消</div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
/* :root放置自定义属性 */
:root{
  --op-search-padding: 10px var(--van-padding-sm);
  --op-search-background-color: var(--van-background-2);
  --op-search-content-background: var(--van-gray-1);
  --op-search-left-icon-color: var(--van-gray-6);
  --op-search-action-padding: 0 var(--van-padding-xs);
  --op-search-action-text-color: var(--white-color);
  --op-search-action-font-size: var(--van-font-size-md);
  --op-search-input-height: 30px;
}
.op-search{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: var(--op-search-padding);
  background: var(--op-search-background-color);

  &--show-action {
    padding-right: 0;
  }

  &__content{
    display: flex;
    flex: 1;
    padding-left:var(--van-padding-sm);
    background:var(--op-search-content-background);
    border-radius:50px;
  }

  &__action {
    padding: var(--op-search-action-padding);
    color: var(--op-search-action-text-color);
    font-size: var(--op-search-action-font-size);
    line-height: var(--op-search-input-height);
    cursor: pointer;
    user-select: none;
  }

  &__field{
    flex: 1;
    padding: 5px var(--van-padding-xs) 5px 0;
    background-color: transparent;
    .op-field__left-icon{
      color: var(--op-search-left-icon-color);
      margin-right: var(--van-padding-base);
      .van-icon {
        font-size: var(--van-field-icon-size);
        top: 0.1rem;
      }
    }
  }
}

.op-cell{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  color: var(--van-cell-text-color);
  font-size: var(--van-cell-font-size);
  &__value{
    flex: 1;
    color: var(--van-cell-text-color);
    vertical-align: middle;
    word-wrap: break-word;
  }
}

.op-field{
  &__body{
    display: flex;
    align-items: center;
  }
  &__control{
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--van-text-color-2);
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    resize: none;
    user-select: none;
    &::placeholder {
      color: var(--van-text-color-2);
    }
  }
  &__right-icon{
    color: var(--van-field-right-icon-color);
    padding: 0 var(--van-padding-xs);
    line-height: inherit;
    flex-shrink: 0;
  }
  &__clear{
    color: var(--van-field-clear-icon-color);
    font-size: var(--van-field-clear-icon-size) !important;
    cursor: pointer;
  }
}
/*  去除input默认自带的关闭按钮 */
input {
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
}
</style>
