<template>
  <el-main class="layout-main">
    <div class="app-breadcrumb">
      <Breadcrumb />
    </div>
    <el-scrollbar ref="scrollbarRef" :class="store.state.appConfigModule.isCollapse ? 'app-scrollbar-container' : 'app-scrollbar-container isCollapse'" :always="true">
      <TipsInfo tips-type="mainPage" />
      <layout-parent-view />
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import LayoutParentView from '@/layout/router-view/parent.vue';
import Breadcrumb from '@/layout/component/breadcrumb.vue';
import TipsInfo from '@/layout/component/tipsInfo.vue';
import { watch, ref } from 'vue';
import { ElScrollbar } from 'element-plus';
import { useStore } from 'vuex';
const store = useStore();
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
watch(
  () => store.state.appConfigModule.tipsInfo,
  () => {
    if (store.state.appConfigModule.tipsInfo.info.length > 0) scrollbarRef.value!.setScrollTop(0);
  }
);
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  background-color: #e5e5e5;
}
.app-scrollbar-container {
  height: calc(100vh - 120px);
}
</style>
