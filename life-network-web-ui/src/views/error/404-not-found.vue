<template>
  <not-found-view
    :title="$t('i18n.notFound.foundTitle')"
    :msg="$t('i18n.notFound.foundMsg')"
  />
</template>

<script lang="ts" setup>
import notFoundView from '@/layout/not-found-view/index.vue'
</script>
