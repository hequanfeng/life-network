<template>
  <div class="layout-aside" v-show="!isCollapse">
    <el-menu @select="handleSelect" router :default-active="defaultActive" background-color="transparent" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false">
      <template v-for="(item, index) in routesList">
        <template v-if="item.children && item.children.length > 0">
          <el-sub-menu :key="index" :index="item.path">
            <template #title>
              <span v-if="globalI18n === 'en-US'">{{ item.meta.title }}</span>
              <span v-else-if="globalI18n === 'zh-HK'">{{ item.meta.titleHk }}</span>
              <span v-else-if="globalI18n === 'zh-CN'">{{ item.meta.titleZhTw }}</span>
            </template>
            <sub-item :children="item.children" />
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :key="index" :index="item.path">
            <template #title>
              <span v-if="globalI18n === 'en-US'">{{ item.meta.title }}</span>
              <span v-else-if="globalI18n === 'zh-HK'">{{ item.meta.titleHk }}</span>
              <span v-else-if="globalI18n === 'zh-CN'">{{ item.meta.titleZhTw }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, ref, inject } from 'vue'
import { useRoute, onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from 'vue-router'
import { useStore } from 'vuex'
import SubItem from '@/layout/component/subItem.vue'
import { MenuRoutersType } from '@/store/modules/routes-list-module'
const props = defineProps({
  routesList: {
    type: Array as PropType<MenuRoutersType[]>,
    default: () => {
      return []
    }
  }
})
const store = useStore()
const route = useRoute()
const reload = inject('reload')
const handleSelect = (index: string) => {
  if (typeof reload == 'function' && route.fullPath == index) {
    reload()
  }
}

const isCollapse = computed(() => {
  return store.state.appConfigModule.isCollapse
})

const defaultActive = ref(route.path)
const globalI18n = computed(() => {
  return store.state.appConfigModule.globalI18n
})

const setParentHighlight = (currentRoute: RouteLocationNormalizedLoaded) => {
  const { path, meta } = currentRoute
  const pathSplit: string[] = path.split('/')
  if (pathSplit.length >= 4 && meta.isHide) {
    return pathSplit.splice(0, 3).join('/')
  } else {
    return path
  }
}

onMounted(() => {
  defaultActive.value = setParentHighlight(route)
})

onBeforeRouteUpdate((to) => {
  if (to.meta.isMenu) {
    store.commit('appConfigModule/REMOVE_OWN_KEEP_ALIVE', to.meta.screenID)
  }
  defaultActive.value = setParentHighlight(to)
})
</script>
