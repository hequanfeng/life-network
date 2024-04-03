import { RouteComponent, RouteRecordRaw } from 'vue-router'
import LayoutParentView from '@/layout/router-view/parent.vue'
import LayoutNotFound from '../layout/router-view/not-found-route-view.vue'

type Lazy<T> = () => Promise<T>

interface RoutesEnumFileType {
  fileName: string
  file: RouteComponent | Lazy<RouteComponent>
  children?: RouteRecordRaw[]
}

export const RoutesEnumFile: Record<string, RoutesEnumFileType> = {
  LayoutParentView: {
    fileName: 'LayoutParentView',
    file: LayoutParentView
  },
  LayoutNotFound: {
    fileName: 'Page not found',
    file: LayoutNotFound
  },
 
}

export default function getRoutesEnumFiles(fileUrl: string): RoutesEnumFileType {
  const fileData = RoutesEnumFile[fileUrl]
  if (fileData) {
    return fileData
  } else {
    return RoutesEnumFile['LayoutNotFound']
  }
}
