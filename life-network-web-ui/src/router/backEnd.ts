import { MenuRouterType } from '@/api/menu/index'
import { RouteRecordRaw } from 'vue-router'
import getRoutesEnumFiles from './importRoutes'

/**
 * Back-end route Component conversion
 */
export function backEndComponent(routes: Array<MenuRouterType>): RouteRecordRaw[] {
  const routeList: RouteRecordRaw[] = []
  for (let index = 0; index < routes.length; index++) {
    const element = routes[index]
    const meta = element.meta
    meta.isMenu = true
    const fileName = meta.fileName || ''
    const routerFileInfo = getRoutesEnumFiles(fileName)
    meta.screenID = routerFileInfo.fileName
    meta.menuName = fileName
    const routerData: RouteRecordRaw = {
      path: element.path,
      name: routerFileInfo.fileName,
      redirect: element.redirect,
      component: routerFileInfo.file,
      meta: meta,
      children: []
    }
    const children = element.children
    if (Array.isArray(children) && children.length >= 1) {
      if (meta.isHide) {
        for (let j = 0; j < children.length; j++) {
          children[j].meta.isHide = meta.isHide
        }
      }
      routerData.children = backEndComponent(children)
    }
    routeList.push(routerData)
  }
  return routeList
}

export function backEndChildrenComponent(arr: RouteRecordRaw[]): RouteRecordRaw[] {
  for (let index = 0; index < arr.length; index++) {
    const menuName = arr[index].meta?.menuName
    if (menuName && menuName != 'LayoutParentView') {
      const routerFileInfo = getRoutesEnumFiles(menuName as string)
      const children = routerFileInfo.children
      if (Array.isArray(children) && children.length >= 1) {
        arr[index].children = children
      }
    }
  }
  console.log(arr)
  return arr
}
