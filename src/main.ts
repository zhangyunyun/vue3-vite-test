import { createApp } from 'vue'
import { createPinia  } from 'pinia'
import App from './App.vue'
import router from '../src/router/index'

//引入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

//引入vant
import 'vant/lib/index.css'
import { Loading } from 'vant';

import './style.css'
import './assets/common.scss'

//引入echarts
import * as echarts from 'echarts'

//pinia
const pinia = createPinia()

const app = createApp(App)
//放入全局echarts
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(pinia)
app.use(Loading)

//统一设置body的基础font-size大小
const rootValue = 16 //设计稿中的fontsize
const rootWidth = 350 //设计稿的宽度350
const deviceWidth = document.documentElement.clientWidth //用户屏幕的宽度
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px' //设置body中的fontsize

app.mount('#app')
//createApp(App).mount('#app')