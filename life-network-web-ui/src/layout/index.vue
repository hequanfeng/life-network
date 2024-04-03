<template>
  <el-container class="layout-container is-vertical">
    <Header></Header>
    <el-container>
      <div class="aside">
        <Aside :routes-list="routesList"></Aside>
      </div>
      <Main v-if="isRouterAlive"></Main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, ref, provide, getCurrentInstance, ComponentInternalInstance, nextTick } from 'vue'
import { useStore } from 'vuex'
import Main from '@/layout/component/main.vue'
import Aside from '@/layout/component/aside.vue'
import Header from '@/layout/component/header.vue'
const isRouterAlive = ref(true)
const routerAlive = () => {
  isRouterAlive.value = false
  store.commit('appConfigModule/REMOVE_ALL_KEEP_ALIVE')
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', routerAlive)

const store = useStore()

const routesList = computed(() => {
  return store.state.routesListModule.menuRoutesList
})
</script>

<style lang="scss" scoped>
.aside {
  ::-webkit-scrollbar-track-piece {
    background-color: rgba($color: #000000, $alpha: 0);
  }
  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #475571;
    background-clip: padding-box;
    min-height: 28px;
    border-radius: 5px;
    border: 0px solid #fff;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #5f6779;
  }
}
</style>
