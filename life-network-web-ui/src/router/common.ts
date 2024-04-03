import { RouteRecordRaw } from 'vue-router'

/**
 * The recursive function of route filtering filters out the ones without meta and ishide
 */
export const filterRoutesFun = (arr: RouteRecordRaw[]): RouteRecordRaw[] => {
  const resList: RouteRecordRaw[] = []
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    const elementMeta = element.meta
    if (elementMeta && !elementMeta.isHide) {
      const item: RouteRecordRaw = {
        ...element,
        path: element.path,
        children: []
      }
      if (Array.isArray(element.children) && element.children.length >= 1) {
        if (element.children.length === 1) {
          const childrenMeta = element.children[0].meta
          if (childrenMeta && childrenMeta.title === elementMeta.title) {
            item.path = element.children[0].path
            item.children = []
          } else {
            item.children = filterRoutesFun(element.children)
          }
        } else {
          item.children = filterRoutesFun(element.children)
        }
      }
      resList.push(item)
    }
  }
  return resList
}

/**
 * Convert multi-level nesting to one level
 */
export function formatTwoStageRoutes(arr: RouteRecordRaw[]): RouteRecordRaw[] {
  const newArr: RouteRecordRaw[] = []
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    const routeInfo: RouteRecordRaw = { ...element, children: [] }
    const meta = routeInfo.meta
    const isLayoutParentView = meta?.fileName === 'LayoutParentView'
    if (isLayoutParentView) {
      newArr.push({
        path: element.path,
        meta: meta,
        redirect: element.redirect || '/home'
      })
      if (Array.isArray(element.children) && element.children.length >= 1) {
        const childrenList = formatTwoStageRoutes(element.children)
        for (let j = 0; j < childrenList.length; j++) {
          const item = childrenList[j]
          newArr.push(item)
        }
      }
    } else {
      newArr.push(routeInfo)
    }
  }
  return newArr
}
