import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { store } from '../store'
import router from '@/router'
import { reactive } from 'vue'
export interface RequestResultType<T = any> {
  data: T
}

export interface DropDownListType {
  value: string
  label: string
}

export const baseData = reactive<RequestBaseType>({
  dateMask: 'dd-MM-yyyy',
  dateTimeMask: 'dd-MM-yyyy HH:mm:ss',
  language: 'en-US'
})

export interface RequestBaseType {
  language?: string
  dateMask?: string
  dateTimeMask?: string
}

interface ServiceResultType {
  code: number
  message?: string
  body: any
}

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<RequestResultType>
  }
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

const pendingMap = new Map<string, AbortController>()
const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&')
}

export function removeAllPending(): void {
  pendingMap.forEach((abortController, url) => {
    if (abortController) {
      abortController.abort()
    }
  })
  pendingMap.clear()
}

export function removePending(config: AxiosRequestConfig): void {
  const url = getPendingUrl(config)
  if (pendingMap.has(url)) {
    const abortController = pendingMap.get(url)
    if (abortController) {
      abortController.abort(url)
    }
    pendingMap.delete(url)
  }
}

service.interceptors.request.use(
  (config) => {
    store.commit('appConfigModule/CLEAR_TIPS_INFO')
    const url = getPendingUrl(config)
    const controller = new AbortController()
    if (!pendingMap.has(url)) {
      pendingMap.set(url, controller)
    }
    config.signal = controller.signal
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    console.log(response)
    if ((response.data === '' && response.request.responseURL.indexOf('api/login') > 0) || response.data.access === 'false') {
      store.dispatch('userInfosModule/serUserLogOut')
      router.push({ path: '/login', query: { auth: '0' } })
      return Promise.reject()
    }
    if (response.config.responseType === 'arraybuffer' && response.status === 200) {
      const fileName = response.headers['content-disposition']
      if (fileName) {
        const blob = new Blob([response.data])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName.split('filename=')[1].replace(/\"/g, ''))
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(url)
        return Promise.resolve(response)
      } else {
        return Promise.resolve(response)
      }
    } else {
      return Promise.resolve(response)
    }
  },
  (error: any) => {
    console.log('Request exception:', error)
    try {
      console.log('response.satatus:', error.response.status)
      if (error.response.status === 302) {
        console.log(error.response.headers.location)
        return Promise.reject(error)
      }
      if (error.response.status === 400) {
        if (error.response.data == 'noOperatingDate') {
          router.push('/NoOperatingDate')
        }
        return Promise.reject(error)
      }
      if (error.response.config.responseType) {
        if (error.response.config.responseType === 'arraybuffer') {
          var enc = new TextDecoder('utf-8')
          var res = JSON.parse(enc.decode(new Uint8Array(error.response.data)))
          if (res.errors) {
            store.commit('appConfigModule/SET_TIPS_INFO', {
              type: 'error',
              title: 'Errors:',
              info: res.errors
            })
            return Promise.reject(error)
          }
        }
      }

      if (error.response.data.session === 'false') {
        console.log('session expiration')
        store.dispatch('userInfosModule/serUserLogOut')
        router.push({ path: '/login', query: { auth: '0' } })
        return Promise.reject()
      }
      if (error.response.data.access === 'false' || error.response.status == 403) {
        store.dispatch('userInfosModule/serUserLogOut')
        router.push('/403')
        return Promise.reject(error)
      }

      let Errors = ''
      if (error.response.data.errors) {
        store.commit('appConfigModule/SET_TIPS_INFO', {
          type: 'error',
          title: 'Errors:',
          info: error.response.data.errors
        })
      } else {
        const resData = error.response.data as ServiceResultType
        if (error.message.indexOf('timeout') !== -1) {
          Errors = 'Network Timeout'
        } else if (error.message == 'Network Error') {
          Errors = 'Network connection error'
        } else if (resData) {
          Errors = resData.message || 'The AFCTRM system is currently experiencing difficulties. Please notify administrator to check.'
        } else {
          Errors = 'The AFCTRM system is currently experiencing difficulties. Please notify administrator to check. ：' + error
        }
        store.commit('appConfigModule/SET_TIPS_INFO', {
          type: 'error',
          title: 'Errors:',
          info: Errors.split(',')
        })
      }
    } catch {
      if (error.code != 'ERR_CANCELED') {
        store.dispatch('userInfosModule/serUserLogOut')
        router.push({ path: '/login', query: { auth: '0' } })
      }
    }
    return Promise.reject(error)
  }
)

export function Request<T = any>(config: AxiosRequestConfig): Promise<RequestResultType<T>> {
  return service(config)
}
