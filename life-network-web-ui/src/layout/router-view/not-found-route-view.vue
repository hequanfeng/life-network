<template>
  <not-found-view :height="height" :title="$t('i18n.notFound.foundTitle1')" :msg="$t('i18n.notFound.foundMsg1')" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import notFoundView from '@/layout/not-found-view/index.vue'

export default defineComponent({
  name: 'LayoutNotFoundRouteView',
  components: { notFoundView },
  setup() {
    const height = computed(() => {
      return '80px'
    })
    return {
      height
    }
  }
})
</script>
