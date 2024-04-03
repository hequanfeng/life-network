<template>
  <template v-for="(item, index) in children">
    <template v-if="item.children && item.children.length > 0">
      <el-sub-menu :key="index" :index="item.path">
        <template #title>
          <span v-if="globalI18n === 'en-US'">{{ item.meta.title }}</span>
          <span v-else-if="globalI18n === 'zh-HK'">{{ item.meta.titleHk }}</span>
          <span v-else-if="globalI18n === 'zh-CN'">{{ item.meta.titleCn }}</span>
        </template>
        <nav-menu-sub-item :children="item.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="index" :index="item.path">
        <span v-if="globalI18n === 'en-US'">{{ item.meta.title }}</span>
        <span v-else-if="globalI18n === 'zh-HK'">{{ item.meta.titleHk }}</span>
        <span v-else-if="globalI18n === 'zh-CN'">{{ item.meta.titleCn }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { MenuRoutersType } from '@/store/modules/routes-list-module';
export default defineComponent({
  name: 'NavMenuSubItem',
  props: {
    children: {
      type: Array as PropType<MenuRoutersType[]>,
      default: () => []
    }
  },
  setup() {
    const store = useStore();
    const globalI18n = computed(() => {
      return store.state.appConfigModule.globalI18n;
    });
    return {
      globalI18n
    };
  }
});
</script>
