import config from './config'
import { localStore } from '@/common/storage'
import { Message, LoadingBar } from 'view-design'
import qs from 'qs'
import router from '@/router'

// NOTE: service 分层设置
import LoginService from './login'

let toast = false

const responseError = error => {
  if (error && error.response && error.response.status === 401) {
    Message.error('登录已过期，请退出应用后重新登录')
    setTimeout(() => {
      router.replace({
        name: 'login',
      })
    }, 1500)
  } else if (error && error.response && error.response.status !== 200) {
    if (error && error.response && error.response.data && error.response.data.message) {
      Message.error(error.response.data && error.response.data.message)
    } else {
      Message.error('系统繁忙，请稍后再试！')
    }
  }
  LoadingBar.finish()
}

const requestInterceptor = config => {
  LoadingBar.start()
  const token = localStore.get('access_token') || ''

  if (config.url !== '/login') {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  if (config.method.toLocaleLowerCase() === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.data = qs.stringify(config.data)
  }
  return config
}

const responseInterceptor = response => {
  let errors = {
    400: () => {
      if (toast) return
      toast = true
      Message({
        message: '参数错误',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
    404: () => {
      if (toast) return
      toast = true
      Message({
        message: '接口不存在',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
    405: () => {
      if (toast) return
      toast = true
      Message({
        message: '传参错误',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
    415: () => {
      if (toast) return
      toast = true
      Message({
        message: '传参错误',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
    500: () => {
      if (toast) return
      toast = true
      Message({
        message: '服务繁忙，请稍后再试',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
    502: () => {
      if (toast) return
      toast = true
      Message({
        message: 'Bad Gateway',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
    503: () => {
      if (toast) return
      toast = true
      Message({
        message: 'Service Unavailable',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
    504: () => {
      if (toast) return
      toast = true
      Message({
        message: 'Gateway Timeout',
        duration: 3,
        type: 'error',
      })
      toast = false
    },
  }

  let code = response && (response.status + '').startsWith('20') ? +response.data.status : response.status
  if (errors[code]) {
    errors[code]()
  } else {
    !(code + '').startsWith('20') && Message.error(response.data && response.data.message)
  }
  LoadingBar.finish()
  return response
}

export const loginService = new LoginService({
  baseUrl: process.env.NODE_ENV === 'production' ? config.production : config.development,
  basePath: 'topic',
  responseError: error => {
    responseError(error)
  },
  requestError: () => {},
  responseInterceptor: config => {
    return responseInterceptor(config)
  },
  requestInterceptor: config => {
    return requestInterceptor(config)
  },
})
