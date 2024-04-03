<template>
  <span class="search-form">{{ props.paramData }}</span>
  <div class="search-div"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  paramData: {
    default: true,
    type: String
  }
});
</script>

<style lang="scss" scoped>
.search-div {
  width: 100%;
  min-width: 100%;
  min-height: 3px;
  margin-top: 0px;
  margin-bottom: 10px;
  background-color: #6f8ad2;
}
</style>
