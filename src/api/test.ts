/* 
   包含n多个函数请求模块
   返回值是 promise对象
*/
import Ajax from './ajax.ts'

/* 
   测试数据
*/
export const reqTestData = () => {
   return Ajax.get('test') //test就是请求的url
}

/* 
   商品测试 get请求
*/
//get请求,没参数
// export const reqCommodity = () => {
//    return Ajax.get('/cloudStore/queryAllBuss')
// }
    
/* 
   商品转发测试 post请求
*/
//post请求,没参数
// export const reqForwardLink = () => {
//    return Ajax.post("/cloudStore/queryShareIdByMobile")
// }
   

