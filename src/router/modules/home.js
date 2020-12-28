/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-08-14 10:57:24
 * @LastEditTime: 2020-09-30 15:44:00
 */
const home = () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
const about = () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue')
export default [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: about,
    meta: {
      title: '关于',
    },
  },
]
