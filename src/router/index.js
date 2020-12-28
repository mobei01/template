/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-08-03 13:53:39
 * @LastEditTime: 2020-08-14 16:56:50
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './routes'

Vue.use(VueRouter)

const routes = [
  ...route,
  {
    // 会匹配所有路径
    path: '/403/:lang',
    name: '403',
    component: () => import(/* webpackChunkName: "403" */ '@/views/exception/403.vue'),
  },
  {
    // 会匹配所有路径
    path: '/500/:lang',
    name: '500',
    component: () => import(/* webpackChunkName: "500" */ '@/views/exception/500.vue'),
  },
  {
    // 会匹配所有路径
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/exception/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
})

// 做相关拦截
router.beforeEach((to, from, next) => {
  next()
})

export default router
