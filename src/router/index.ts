import { createRouter, createWebHistory } from "vue-router"

let routes = [
   {
      path:'/',
      name:'tabs',
      //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
      component:() => import('../views/tabs/TabsView.vue'),
      children:[
         {
            path:'/',
            redirect:'/home'
         },
         {
            path:'/home',
            name:'home',
            component:() => import('../views/tabs/home/HomeView.vue')
         },
         {
            path:'/order',
            name:'order',
            component:() => import('../views/tabs/order/OrderView.vue')
         },
         {
            path:'/mine',
            name:'mine',
            component:() => import('../views/tabs/mine/MineView.vue')
         },
         {
            path:'/test',
            name:'test',
            component:() => import('../views/tabs/test/TestView.vue')
         }
      ]
   },
   
   //{
        //配置404页面
        //path: '/:catchAll(.*)',
        //name: '404',
        //component: () => import(''),
   //}
]

//路由
const router = createRouter({
   history: createWebHistory(),
   routes
})

//导出
export default router
