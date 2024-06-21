/* 
   包含n多个函数请求模块
   返回值是 promise对象
*/
import type { ISearchResultList } from '@/types'
import Ajax from './ajax.ts'

/* 
   请求搜索接口函数
*/
export function reqSearchData(key=''){
   return Ajax.get<ISearchResultList,ISearchResultList>('homeSearch',{
      params:{ 
         labelLike:key 
      } //labelLike为向后台传递的参数属性名(和后台接口接收的属性名保持一致)
   }) //homeSearch 就是请求的url
}
 
