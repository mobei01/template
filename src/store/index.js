/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: vuex分层设计
 * @Date: 2020-08-03 13:53:39
 * @LastEditTime: 2020-08-14 10:23:11
 */
import Vue from 'vue'
import Vuex from 'vuex'

import { getAppCount, KEY_STORE, KEY_APP_COUNT } from '@/store/utils/lib'

// NOTE: 模块化store
import login from './modules/login'

// NOTE: 用于缓存 `vuex` 的状态, 解决刷新时数据丢失, 实质是通过本地缓存统一存储
import createPersistedState from 'vuex-persistedstate'

const createPersisted = createPersistedState({
  key: `${KEY_STORE}-${getAppCount() + 1}`, // NOTE: 做项目分离, 主要时防止多个项目启动,出现数据交叉污染的问题
  storage: window.sessionStorage,
})

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// NOTE: 页面关闭时, 需要清空 `store` 缓存
window.addEventListener('unload', () => {
  const appCount = getAppCount()
  if (appCount > 1) {
    // 递减应用实例个数
    window.localStorage.setItem(KEY_APP_COUNT, appCount - 1)
  } else {
    window.localStorage.removeItem(KEY_APP_COUNT)
  }
})

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger(), createPersisted] : [createPersisted],
})
