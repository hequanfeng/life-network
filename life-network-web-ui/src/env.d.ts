/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_URL: string
  VITE_API_URL2: string
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const vueComponent: DefineComponent<{}, {}, any>

  export default vueComponent
}
