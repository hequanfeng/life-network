<template>
  <el-header class="layout-header">
    <svg-icon name="svg-mtrWhite" class="logo" /><el-divider direction="vertical" style="height: 30px" />
    <span class="system-title">AFCTRM - AFC Ticket And Revenue Module</span>
    <User />
  </el-header>
</template>

<script lang="ts" setup>
import {} from 'vue';
import SvgIcon from '@/components/svg-icon/svg-icon.vue';
import User from '@/layout/component/user.vue';
</script>

<style lang="scss" scoped>
.logo {
  width: 215px;
  height: 50px;
}
</style>
