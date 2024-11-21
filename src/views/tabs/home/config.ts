/*
 * @Author: v3-vite-test 876023825@qq.com
 * @Date: 2023-09-18 11:13:11
 * @LastEditors: v3-vite-test 876023825@qq.com
 * @LastEditTime: 2023-09-18 11:19:48
 * @FilePath: \v3-vite-test\src\views\tabs\home\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* 
  Todo正在开发
  ShopList推荐商品
*/
import Todo from '@/components/OpTodo'
export const HOME_TABS = [
  {
    id:1,
    title: '附近推荐',
    value: 'recommend',
    component: Todo, //tab对应的内容组件
  },
  {
    id:2,
    title: '发现好菜',
    value: '1',
    component: Todo, //tab对应的内容组件
  },
  {
    id:3,
    title: '超市',
    value: '2',
    component: Todo,
  },
  {
    id:4,
    title: '水果',
    value: '3',
    component: Todo,
  },
  {
    id:5,
    title: '买菜',
    value: '4',
    component: Todo,
  },
  {
    id:6,
    title: '到店吃',
    value: '5',
    component: Todo,
  },
  {
    id:7,
    title: '玩乐',
    value: '6',
    component: Todo,
  },
  {
    id:8,
    title: '医药',
    value: '6',
    component: Todo,
  }
]