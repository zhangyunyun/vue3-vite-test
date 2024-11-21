/* 
  包含n多个函数请求模块
  返回值是 promise对象
*/
import Ajax from './ajax.ts'
import type { IHomeInfo } from '@/types' //自定义数据类型

/* 
  请求首页列表接口函数
*/
export const reqHomePageData = () => {
  return Ajax.get<IHomeInfo,IHomeInfo>('homePage')
}

/* 
  请求首页商铺列表接口函数
*/
export const reqShopList = () => {
  return Ajax.get('shopList')
}
