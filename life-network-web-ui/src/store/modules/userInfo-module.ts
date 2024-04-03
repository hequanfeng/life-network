import { Module } from 'vuex'
import { RootStateTypes } from '..'
import { resetRoute } from '@/router'
import { Local } from '@/utils/storage'
import { LabelValueBean } from '@/api'

export interface UserInfoStateModule {
  userInfos: UserInfoStateType
  stationInofs: StationInfosType
  screenButtonRole: string[]
}

export interface UserRoleStateType {
  userRole: string
  screenId: string
  userPrivil: string
  buttonId: string
}

export interface UserInfoStateType {
  token: string
  roles: []
  userName: string
}

export interface StationInfosType {
  stationNo: string
  operatingDate: string
  shiftCode: string
  allShift: Array<LabelValueBean>
  stationName: string
  OperatorId: string
  ocpOperatorId: string
  locationCode: string
  reportId: string
  reportFormat: string
  lineGroup1: string
  lineGroup2: string
  groupAccountId: string
}

const defaultStationInofs: StationInfosType = {
  stationNo: '1',
  operatingDate: '14-06-2023',
  shiftCode: 'E000',
  stationName: 'CENTRAL',
  allShift: [],
  OperatorId: 'KFUNGAPJ',
  ocpOperatorId: '',
  locationCode: '3',
  reportId: 'TRM1202_R1',
  reportFormat: 'PDF',
  lineGroup1: '1',
  lineGroup2: '3',
  groupAccountId: 'CEN'
}

const defaultUserRoleInfos: UserRoleStateType = {
  userRole: '',
  screenId: '',
  userPrivil: '',
  buttonId: ''
}

const defaultUserInfos: UserInfoStateType = {
  token: '',
  roles: [],
  userName: ''
}

const userInfos = Local.get<UserInfoStateType>('userInfo') || defaultUserInfos
const stationInofs = Local.get<StationInfosType>('stationInof') || defaultStationInofs
const userInfosModule: Module<UserInfoStateModule, RootStateTypes> = {
  namespaced: true,
  state: {
    userInfos: userInfos,
    stationInofs: stationInofs,
    screenButtonRole: []
  },
  mutations: {
    SET_USER_INFOS(state, data: UserInfoStateType) {
      state.userInfos = data
    },
    SET_SCREEN_BUTTON_ROLE(state, data: string[]) {
      state.screenButtonRole = data
    }
  },
  actions: {
    setUserInfos(context, data?: UserInfoStateType) {
      if (data) {
        Local.set('userInfo', data)
        context.commit('SET_USER_INFOS', data)
      } else {
        context.commit('SET_USER_INFOS', defaultUserInfos)
      }
    },
    async serUserLogOut(context) {
      console.log('serUserLogOut')
      Local.clear()
      await context.dispatch('setUserInfos')
    }
  }
}

export default userInfosModule
