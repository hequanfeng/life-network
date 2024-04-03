import { createStore, Store } from 'vuex'
import routesListModule, {
  RoutesListModuleState
} from './modules/routes-list-module'

import userInfosModule, { UserInfoStateModule } from './modules/userInfo-module'

import appConfigModule, {
  AppConfigModuleState
} from './modules/app-config-module'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootStateTypes>
  }
}

declare module 'vuex' {
  export function useStore<S = RootStateTypes>(): Store<S>
}

export interface RootStateTypes {
  userInfosModule: UserInfoStateModule
  routesListModule: RoutesListModuleState
  appConfigModule: AppConfigModuleState
}

export const store = createStore<RootStateTypes>({
  modules: { userInfosModule, routesListModule, appConfigModule }
})
