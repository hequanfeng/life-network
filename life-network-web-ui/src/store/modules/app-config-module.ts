import { Module } from 'vuex'
import { RootStateTypes } from '..'
import { Local } from '@/utils/storage'
import { CancelTokenSource } from 'axios'

export type TipsInfo = 'success' | 'info' | 'warning' | 'error'
export type GlobalI18nType = 'zh-CN' | 'en-US' | 'zh-HK'
export type TipsInfoType = 'mainPage' | 'dialog'

export interface TipsType {
  type: TipsInfo
  title?: string
  info: []
}
export interface AppConfigModuleState {
  globalI18n: GlobalI18nType
  tipsInfo: TipsType
  axiosPromiseArr: CancelTokenSource[]
  cacheKeepAlive: Array<string>
  isCollapse: boolean
  tipsInfoType: TipsInfoType
}

const globalI18n = Local.get<GlobalI18nType>('globalI18nLocal')

const appConfigModule: Module<AppConfigModuleState, RootStateTypes> = {
  namespaced: true,
  state: {
    globalI18n: globalI18n || 'en-US',
    tipsInfo: {
      type: 'info',
      title: '',
      info: []
    },
    cacheKeepAlive: [],
    axiosPromiseArr: [],
    isCollapse: false,
    tipsInfoType: 'mainPage'
  },
  mutations: {
    SET_KEEP_ALIVE(state, screenID: string) {
      if (!state.cacheKeepAlive.includes(screenID)) {
        state.cacheKeepAlive.push(screenID)
      }
    },
    REMOVE_ALL_KEEP_ALIVE(state) {
      state.cacheKeepAlive = []
    },
    REMOVE_KEEP_ALIVE(state, payload: string) {
      state.cacheKeepAlive = state.cacheKeepAlive.filter((item: string) => item.toUpperCase() !== payload.toUpperCase())
      console.log(state, 'state')
    },
    REMOVE_OWN_KEEP_ALIVE(state, screenID: string) {
      state.cacheKeepAlive = state.cacheKeepAlive.filter((item: string) => {
        console.log(item.toUpperCase(), 'item')
        console.log(screenID.toUpperCase(), 'payload')
        console.log(item.toUpperCase() === screenID.toUpperCase())
        return item.toUpperCase() === screenID.toUpperCase()
      })
    },
    SET_IS_COLLAPSE(state, data: boolean) {
      state.isCollapse = data
    },
    SET_GLOBAL_I18N(state, data: GlobalI18nType) {
      state.globalI18n = data
      if (data === 'en-US') {
        Local.remove('globalI18nLocal')
      } else {
        Local.set('globalI18nLocal', data)
      }
    },
    SET_TIPS_INFO(state, data: TipsType) {
      state.tipsInfo = data
    },
    CLEAR_TIPS_INFO(state) {
      state.tipsInfo = {
        type: 'error',
        title: '',
        info: []
      }
    },
    SET_AXIOS_PROMISEARR(state, item: CancelTokenSource) {
      state.axiosPromiseArr.push(item)
    },
    CLEAR_AXIOS_PROMISEARR(state) {
      state.axiosPromiseArr = []
    },
    SET_TIPS_INFO_TYPE(state, val: TipsInfoType) {
      state.tipsInfoType = val
    }
  },
  actions: {}
}

export default appConfigModule
