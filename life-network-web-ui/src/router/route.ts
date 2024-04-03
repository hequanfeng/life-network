import { RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/index.vue'

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title?: string
    titleCn?: string
    titleHk?: string
    screenTitle?: string
    screentitleCn?: string
    screentitleHk?: string
    stationLogin?: boolean
    isHide?: boolean
    isMenu?: boolean
    fileName?: string
    screenID?: string
    keepAlive?: boolean
  }
}

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: 'Login', isHide: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404-not-found.vue'),
    meta: {
      title: 'Page could not be found'
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
    meta: {
      title: 'Page could not be found'
    }
  }
]

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    meta: {
      screenID: 'Home',
      fileName: 'Welcome',
      title: 'Welcome',
      keepAlive: false,
      isAffix: true,
      isHide: true
    },
    component: () => import('../views/home/index.vue')
  },
]

export const dynamicRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: LayoutView,
  redirect: '/home',
  meta: {
    fileName: 'Home',
    keepAlive: false
  },
  children: []
}
