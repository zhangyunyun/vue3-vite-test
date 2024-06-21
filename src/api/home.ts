/* 
  包含n多个函数请求模块
  返回值是 promise对象
*/
import type { IHomeInfo } from '@/types' //自定义数据类型
import Ajax from './ajax.ts'

/* 
  请求首页列表接口函数
*/
export const reqHomePageData = () => {
  return Ajax.get<IHomeInfo,IHomeInfo>('homePage')
}





