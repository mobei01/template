/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: vuex 中的功能函数
 * @Date: 2020-08-14 09:48:00
 * @LastEditTime: 2020-08-14 10:26:49
 */
export const PROJECT_NAME = 'vue-cli-template' // NOTE: 项目名
export const KEY_STORE = `${PROJECT_NAME}-store` // NOTE: 本地存储缓存store对象的键
export const KEY_APP_COUNT = `${PROJECT_NAME}-count` // NOTE: 设置当前应用

export function getAppCount() {
  let count = parseInt(window.localStorage.getItem(KEY_APP_COUNT), 10)
  if (isNaN(count)) {
    count = 0
  }
  return count
}
