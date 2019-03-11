import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载
const Home = (resolve) => {
  import('@/components/home/Home.vue').then((module) => {
    resolve(module)
  })
}
const Album = (resolve) => {
  import('@/components/album/Album.vue').then((module) => {
    resolve(module)
  })
}
const HtmlAlbum = (resolve) => {
  import('@/components/album/htmlAlbum.vue').then((module) => {
    resolve(module)
  })
}
const JsAlbum = (resolve) => {
  import('@/components/album/jsAlbum.vue').then((module) => {
    resolve(module)
  })
}
const VueAlbum = (resolve) => {
  import('@/components/album/vueAlbum.vue').then((module) => {
    resolve(module)
  })
}
const CountAlbum = (resolve) => {
  import('@/components/album/countAlbum.vue').then((module) => {
    resolve(module)
  })
}
const CompleteAlbum = (resolve) => {
  import('@/components/album/completeAlbum.vue').then((module) => {
    resolve(module)
  })
}
const Mess = (resolve) => {
  import('@/components/mess/Mess.vue').then((module) => {
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
const HtmlWare = (resolve) => {
  import('@/components/ware/htmlWare.vue').then((module) => {
    resolve(module)
  })
}
const JsWare = (resolve) => {
  import('@/components/ware/jsWare.vue').then((module) => {
    resolve(module)
  })
}
const VueWare = (resolve) => {
  import('@/components/ware/vueWare.vue').then((module) => {
    resolve(module)
  })
}
const CountWare = (resolve) => {
  import('@/components/ware/countWare.vue').then((module) => {
    resolve(module)
  })
}
const CompleteWare = (resolve) => {
  import('@/components/ware/completeWare.vue').then((module) => {
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
      path: '/album',
      name: '图册',
      component: Album
    },
    {
      path: '/htmlalbum',
      name: 'html图册',
      component: HtmlAlbum
    },
    {
      path: '/jsalbum',
      name: 'JavaScript图册',
      component: JsAlbum
    },
    {
      path: '/vuealbum',
      name: 'vue图册',
      component: VueAlbum
    },
    {
      path: '/countalbum',
      name: '算法图册',
      component: CountAlbum
    },
    {
      path: '/completealbum',
      name: '完整项目图册',
      component: CompleteAlbum
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
    {
      path: '/htmlware',
      name: 'html仓库',
      component: HtmlWare
    },
    {
      path: '/jsware',
      name: 'js仓库',
      component: JsWare
    },
    {
      path: '/vueware',
      name: 'vue仓库',
      component: VueWare
    },
    {
      path: '/countware',
      name: 'count仓库',
      component: CountWare
    },
    {
      path: '/completeware',
      name: 'complete仓库',
      component: CompleteWare
    },
    ]

})
