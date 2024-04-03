import { RouteMeta, RouteRecordRaw, RouteRecordRedirectOption } from 'vue-router'
import { Module } from 'vuex'
import { RootStateTypes } from '..'

export interface MenuRoutersType {
  path: string
  redirect?: RouteRecordRedirectOption
  meta: RouteMeta
  children: Array<MenuRoutersType>
}

export interface RoutesListModuleState {
  menuRoutesList: Array<MenuRoutersType>
  removeRoutesList: Array<() => void>
}

const routesListModule: Module<RoutesListModuleState, RootStateTypes> = {
  namespaced: true,
  state: {
    menuRoutesList: [],
    removeRoutesList: []
  },
  mutations: {
    SET_MENU_ROUTES_LIST(state, data: Array<RouteRecordRaw>) {
      if (data.length === 0) {
        state.menuRoutesList = []
      } else {
        state.menuRoutesList = filterRoutesFun(data)
      }
    },
    SET_REMOVE_ROUTES_LIST(state, data: Array<() => void>) {
      state.removeRoutesList = data
    }
  },
  actions: {}
}

export default routesListModule

/**
 * The route filter recursive function filters out the and ishide without meta, which are used as the interface with the menu list
 */
const filterRoutesFun = (arr: RouteRecordRaw[]): MenuRoutersType[] => {
  const resList: MenuRoutersType[] = []
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    const elementMeta = element.meta
    if (elementMeta && !elementMeta.isHide) {
      const item: MenuRoutersType = {
        path: element.path,
        meta: element.meta || {},
        children: []
      }
      if (Array.isArray(element.children) && element.children.length >= 1) {
        item.children = filterRoutesFun(element.children)
      }
      resList.push(item)
    }
  }
  return resList
}
