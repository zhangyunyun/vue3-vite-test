<script setup lang="ts">
import { ref } from 'vue'
import { computed, watch } from 'vue'

import type { ISearchResult } from '@/types' //自定义数据类型

import { useToggle } from '@/hooks/useToggle.ts' //引入切换动画
import { useDebounce } from '@/hooks/useDebounce.ts'

import { reqSearchData } from '@/api/search.ts'  //引入请求搜索数据的接口函数

import OpSearch from '@/components/OpSearch.vue' //引入search子组件

interface IEmits {
   (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()

const showAction = ref(true)
const searchValue = ref('')  //搜索框输入的值
const [INIT, DOING, DONE] = [-1, 1, 0]  //加载的状态 初始-1  加载成功 0 正在加载1
const searchLoading = ref(INIT)  //加载初始值
const searchResult = ref([] as ISearchResult[])   //搜索的结果列表

const onSearch = async (v ?:string | number) => {
   try {
      //正在加载
      searchLoading.value = DOING
      const { list } = await reqSearchData(v as string)
      //加载成功
      // searchLoading.value = DONE 
      searchResult.value = list
   } finally {
       //加载成功
      searchLoading.value = DONE
   }
}

//历史搜索
const HISTORY_TAGS = [
   '比萨',
   '栗子',
   '切果NOW',
   '炒饭',
   '其他1',
   '其他2',
   '其他3',
   '其他4',
   '其他5',
   '其他6',
   '其他7',
   '其他8'
]
const [historyTagIsShown, historyTagToggle] = useToggle(false)
const historyTags = computed(() => {
   return historyTagIsShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 9)
})

//点击搜索历史内容添加到搜索框
const onTagClick = (v: string) => {
   console.log(v)
   searchValue.value = v
   //调用搜索方法
   onSearch(v)
}

//监听输入框自动搜索
//watch(searchValue, useDebounce((nv) => {
   //if(!nv){
      //searchResult.value = []
      //return
   //}
   //onSearch(nv as String)  //断言
//},1000)
//)
//监听输入框自动搜索,使用hooks文件useDebounce
const debounceValue = useDebounce(searchValue, 1000)
watch(debounceValue, (nv) => {
   if (!nv) {
      searchResult.value = []
      return
   }
   onSearch(nv as string)  //断言
})
</script>

<template>
   <div class="search-view">
      <OpSearch 
         :showAction="showAction" 
         v-model="searchValue" 
         shape="round" 
         placeholder="请输入搜索关键词" 
         @search="onSearch"
         @cancel="emits('cancel')">
         <!--<template #actionBt
           <div @click="emits('cancel')">取消</div>
        </template>-->
      </OpSearch>
      <div v-if="!searchValue" class="search-view__history">
         <div class="label">历史搜索</div>
         <!-- <transition-group move-class="move"> -->
         <div class="history-tag" v-for="v in historyTags" :key="v" @click="onTagClick(v)">
            {{ v }}
         </div>
         <div class="history-tag" @click="historyTagToggle">
            <VanIcon v-if="historyTagIsShown" name="arrow-up"></VanIcon>
            <VanIcon v-else name="arrow-down"></VanIcon>
         </div>
         <!-- </transition-group> -->
      </div>
      <div v-else class="search-view__result">
         <div class="searching" v-if="searchLoading === DOING">~数据加载中~</div>
         <template v-if="searchLoading === DONE">
            <div class="no-result" v-if="!searchResult.length">~暂无数据~</div>
            <div class="result-item" v-for="v in searchResult" :key="v.label">
               <VanIcon name="search"></VanIcon>
               <div class="name">{{ v.label }}</div>
               <div class="count">约{{ v.resultCount }}个结果</div>
            </div>
         </template>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.move {
   transition: 1s
}

.fade-enter-active,
.fade-leave-active {
   transition: all 1s ease
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
   transform: translateY(20px)
}

.search-view {
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   background-color: white;
   z-index: 999;

   &__result {
      .result-item {
         display: flex;
         align-items: center;
         font-size: 12px;
         padding: 10px;
         border-radius: 1px solid var(--van-gray-1);

         .name {
            flex: 1;
            padding-left: 6px;
         }

         .count {
            font-size: 12px;
            color: var(--van-gray-6);
         }
      }

      .no-result,
      .searching {
         font-size: 12px;
         padding: 100px 0;
         text-align: center;
         color: var(--van-gray-6);
      }
   }

   &__history {
      padding: var(--van-padding-sm);

      .label {
         padding-bottom: var(--van-padding-xs)
      }

      .history-tag {
         display: inline-block;
         font-size: 12px;
         border-radius: 10px;
         color: var(--van-gray-6);
         background: var(--van-gray-1);
         padding: 4px 8px;
         margin-right: 8px;
         margin-bottom: var(--van-padding-xs);
      }
   }
}
</style>
