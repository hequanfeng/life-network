<template>
  <div class="router-view">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="store.state.appConfigModule.cacheKeepAlive">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const refreshRouterViewKey = ref<string | undefined>()
watch(
  () => route.fullPath,
  () => {
    refreshRouterViewKey.value = route.fullPath
  }
)
</script>
<style>
.router-view {
  padding: 10px 10px 10px 10px;
}
</style>
