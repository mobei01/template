/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 入口文件
 * @Date: 2020-08-03 13:53:39
 * @LastEditTime: 2020-09-30 16:17:55
 */
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

import i18nManager from '@/common/i18n'

import './plugins/iview.js'
import * as services from '@/common/service'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

// NOTE: 将路由状态同步到store中
sync(store, router)
let keys = Object.keys(services)
keys.forEach(key => {
  Vue.prototype['$' + `${key}`] = services[key]
})

new Vue({
  router,
  store,
  i18n: i18nManager.i18n,
  render: h => h(App),
}).$mount('#app')
