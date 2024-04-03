<template>
  <router-view />
  <div class="printTemplate"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let beforeUnload_time = 0
let gap_time = 0
let beforeunloadHandler = (e: Event) => {
  beforeUnload_time = new Date().getTime()
}
let unloadHandler = (e: Event) => {
  gap_time = new Date().getTime() - beforeUnload_time
  if (gap_time <= 5) {
    store.dispatch('userInfosModule/serUserLogOut')
  }
}

window.addEventListener('beforeprint', () => {
  store.commit('appConfigModule/SET_IS_COLLAPSE', true)
})

window.addEventListener('afterprint', () => {
  store.commit('appConfigModule/SET_IS_COLLAPSE', false)
})

onMounted(() => {
  window.addEventListener('beforeunload', (e) => beforeunloadHandler(e))
  window.addEventListener('unload', (e) => unloadHandler(e))
})
onUnmounted(() => {
  window.removeEventListener('beforeunload', (e) => beforeunloadHandler(e))
  window.removeEventListener('unload', (e) => unloadHandler(e))
})
</script>
