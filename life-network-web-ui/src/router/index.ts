import { createRouter, createMemoryHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { store } from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Local } from '@/utils/storage'
import { staticRoutes, dynamicRoutes, constantRoutes } from '@/router/route'
import { formatTwoStageRoutes } from './common'
import { backEndComponent, backEndChildrenComponent } from './backEnd'
import { Request, removeAllPending } from '@/utils/request'
import qs from 'qs'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createMemoryHistory(),
  routes: staticRoutes
})

export const routePathMatch: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: '/home'
}

const integratedMenu = (tree: any = [], arr: any = [], parName = '') => {
  if (!tree.length) return []
  for (let item of tree) {
    let itemName = item.Name.toLocaleLowerCase().replaceAll('/', '-%2F-').replaceAll(' ', '-')
    let parentName = parName ? parName : ''
    let hasChild = item.MenuItem && item.MenuItem.length
    let node: any = {
      path: parentName + '/' + itemName,
      meta: {
        fileName: hasChild ? 'LayoutParentView' : item.ID,
        title: item.Name
      }
    }
    arr.push(node)
    if (hasChild) {
      node.children = []
      integratedMenu(item.MenuItem, node.children, node.path)
    }
  }
  return arr
}

export async function getBackEndSetAddRoute(): Promise<void> {
  let backEndMenu = await Request({
    url: '/TRM_WEB/api/menu'
  })
    .then((res: any) => {
      return integratedMenu(res.data.MenuItem)
    })
    .catch(function (err) {
      Local.clear()
      resetRoute()
      return []
    })
  if (backEndMenu.length == 0) {
    return Promise.reject()
  }

  const routeList = [...constantRoutes, ...backEndComponent(backEndMenu)]
  store.commit('routesListModule/SET_MENU_ROUTES_LIST', routeList)
  console.log('1:', routeList)
  const dynamicRoutesChildren = formatTwoStageRoutes(routeList)
  console.log(dynamicRoutesChildren)
  backEndChildrenComponent(dynamicRoutesChildren)
  dynamicRoutes.children = dynamicRoutesChildren
  const removeFun = [router.addRoute(dynamicRoutes), router.addRoute(routePathMatch)]
  store.commit('routesListModule/SET_REMOVE_ROUTES_LIST', removeFun)
}

export function resetRoute(): void {
  const removeRoutes = store.state.routesListModule.removeRoutesList
  if (removeRoutes.length >= 1) {
    removeRoutes.forEach((item) => {
      item()
    })
    dynamicRoutes.children = []
    store.commit('routesListModule/SET_MENU_ROUTES_LIST', [])
    store.commit('routesListModule/SET_REMOVE_ROUTES_LIST', [])
    router.push('/login')
  }
}

router.beforeEach(async (to: any, from: any, next: any) => {
  if (to.meta.title) {
    NProgress.start()
  }
  console.log('routerbeforeEach')
  const storeState = store.state
  removeAllPending()
  store.commit('appConfigModule/CLEAR_TIPS_INFO')
  const token = storeState.userInfosModule.userInfos.token
  if ((to.path === '/login' || to.path === '/403') && !token) {
    next()
  } else {
    if (token && to.path === '/login') {
      next('/home')
    } else if (!token) {
      next({
        path: '/login'
      })
      Local.clear()
      resetRoute()
    } else {
      try {
        if (storeState.routesListModule.menuRoutesList.length === 0) {
          await getBackEndSetAddRoute()
            .then((res) => {
              next({ ...to, replace: true })
            })
            .catch((err) => {
              next(false)
            })
        } else {
          next()
        }
      } catch (error) {
        next({
          path: '/login'
        })
        Local.clear()
        resetRoute()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router
