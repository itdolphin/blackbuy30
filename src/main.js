import Vue from 'vue'
import App from './App.vue'
// 导入axios
import axios from "axios"
Vue.prototype.$axios=axios
// 设置axios全局基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/'
// 导入'饿了么ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import moment from "moment"
// 导入全局过滤器
Vue.filter('formatTime', value=>{
  return moment(value).format('YYYY年MM月DD日')
}
)
Vue.use(ElementUI);
// 导入全局样式
import "./assets/statics/site/css/style.css"
// 导入moment
// import moment from "moment"
Vue.config.productionTip = false
// 导入路由
import VueRouter from "vue-router"
// 使用路由
Vue.use(VueRouter)
// 写组件
// 导入组件
import indexVue from "./components/index.vue"
import detailVue from "./components/detail.vue"
import centerContainerVue from "./components/centerContainer.vue"
import vipcenter from "./components/vipcenter.vue"
import tradeOrder from "./components/tradeOrder.vue"
import findOrder from "./components/findOrder.vue"
// 写路由规则
const routes=[
  // 重定向
  {path: '/', redirect:"/index"},
  {path:'/index',component:indexVue},
  {path:'/detail/:id',component:detailVue},
  {path:'/centerContainer',component:centerContainerVue,
  children:[
    {path:'',redirect:"vipcenter"},
    {path:'vipcenter',component:vipcenter},
    {path:'tradeOrder',component:tradeOrder},
    {path:'findOrder',component:findOrder}
  ]
}

]
// 实例化路由
const router=new VueRouter({
  routes
})
// 实例化vue
new Vue({
  render: h => h(App),
  // 挂在顶级Vue上
  router
}).$mount('#app')
