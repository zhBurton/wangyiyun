import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'
const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/itemMusic',
    // 路由名称一般大写 路径小写
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    // 路由名称一般大写 路径小写
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    // 路由名称一般大写 路径小写
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/infoUser',
    // 路由名称一般大写 路径小写
    name: 'InfoUser',
    // 路由守卫
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin||store.state.token||localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "infoUser" */ '../views/InfoUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 全局组件
router.beforeEach((to, from) => {
  if (to.path == '/login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router