<template>
  <el-alert :type="tipsInfo.type" :title="tipsInfo.title" v-if="tipsInfo.info.length > 0 && tipsType === tipsInfoType" @close="clearTipsInfo">
    <div v-for="(item, index) in tipsInfo.info" :key="index">
      {{ item }}
    </div>
  </el-alert>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { useStore } from 'vuex'
import { TipsInfoType } from '@/store/modules/app-config-module'

const props = defineProps({
  tipsType: {
    type: String as PropType<TipsInfoType>,
    required: true
  }
})

const store = useStore()
const tipsInfo = computed(() => {
  return store.state.appConfigModule.tipsInfo
})

const tipsInfoType = computed(() => {
  return store.state.appConfigModule.tipsInfoType
})

const clearTipsInfo = () => {
  store.commit('appConfigModule/CLEAR_TIPS_INFO')
}
</script>
