<template>
  <div class="app-card" v-loading="props?.loading">
    <el-form ref="props?.searchFormRef" label-position="left" labelWidth="props?.formWidth" :model="props?.query">
      <scopTitle :paramData="props.title" />
      <div class="container">
        <slot name="header"></slot>
      </div>
      <scopTitle v-if="showSearchResult" :paramData="$t('i18n.common.label.result')" />
    </el-form>
    <div v-if="showList" class="mim-table">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import scopTitle from '@/components/scop-title/index.vue'
const props = defineProps({
  loading: {
    type: Boolean
  },
  formWidth: {
    type: String
  },
  query: {
    type: Object
  },
  searchFormRef: {
    type: HTMLFormElement
  },
  title: {
    type: String
  },
  showList: {
    type: Boolean,
    default: true
  },
  showSearchResult: {
    type: Boolean,
    default: true
  }
})
</script>

<style>
.container {
  width: 100%;
}
</style>
