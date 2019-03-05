// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
// 引入路由配置
import router from 'router'
// axios请求
import Axios from 'axios'
// flexible 页面适配
import 'lib-flexible'
// 引入Vuex
import store from '@/Vuex/store.js'
// 引入全局变量
import _global from './global.vue'
//引入echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts 
import { AlertModule } from 'vux'
Vue.prototype.alert = function (textVal) {
  AlertModule.show({
    title: '',
    content: textVal
  })
}
Vue.prototype.GLOBAL = _global
// const BASE_URL = process.env.BASE_URL
// Axios.defaults.baseURL = BASE_URL
// Axios.defaults.headers.common['Authorization'] = 'Basic eXVxaXl1X2hvbWVfcGM6eXVxaXl1X3NlY3JldA=='
Vue.prototype.$http = Axios
FastClick.attach(document.body)

Vue.config.productionTip = false

router.afterEach((to, from, next) => {
  document.title = to.name
})

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app-box')
