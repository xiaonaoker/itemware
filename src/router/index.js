import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载
const Home = (resolve) => {
  import('@/components/home/Home.vue').then((module) => {
    resolve(module)
  })
}
const Ablum = (resolve) => {
  import('@/components/ablum/ablum.vue').then((module) => {
    resolve(module)
  })
}
const Mess = (resolve) => {
  import('@/components/mess/mess.vue').then((module) => {
    resolve(module)
  })
}
const MessIssue = (resolve) => {
  import('@/components/mess/messIssue.vue').then((module) => {
    resolve(module)
  })
}
const Ware = (resolve) => {
  import('@/components/ware/ware.vue').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [{
    name: '首页',
    path: '/',
    component: Home,
    meta: {
      keepAlive: false
    }
  },
    {
      path: '/ablum',
      name: '相册',
      component: Ablum
    },
    {
      path: '/mess',
      name: '留言板',
      component: Mess
    },
    {
      path: '/messissue',
      name: '写留言',
      component: MessIssue
    },
    {
      path: '/ware',
      name: '仓库',
      component:Ware
    },
    ]

})
