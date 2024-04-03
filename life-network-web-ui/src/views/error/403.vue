<template>
  <div class="error" :style="{ height: `calc(100vh - ${height}` }">
    <div class="error-flex">
      <div class="left">
        <div class="left-item">
          <div class="left-item-animation"><svg-icon name="svg-mtr" /></div>
          <div class="left-item-animation left-item-title">You do not have authorization to access to this part of the AFCTRM System.</div>
          <div class="left-item-animation left-item-btn">
            <el-button @click="onRouteGo" size="large" class="font16">Login</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue'
import SvgIcon from '@/components/svg-icon/svg-icon.vue'
import { useRouter } from 'vue-router'
import { Request } from '@/utils/request'
const props = defineProps({
  title: {
    type: String,
    default: '0px'
  },
  msg: {
    type: String,
    default: '0px'
  },
  height: {
    type: String,
    default: '0px'
  }
})

const router = useRouter()
Request({
  url: '/TRM_WEB/logout'
}).then(() => {
  console.log('login')
  // router.push('/login')
})

const onRouteGo = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">
.error {
  background-color: var(--el-color-white);
  display: flex;
  .error-flex {
    margin: auto;
    display: flex;
    .left {
      flex: 1;
      height: 100%;
      align-items: center;
      display: flex;
      .left-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .left-item-animation {
          opacity: 0;
          animation-name: error-num;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .left-item-title {
          font-size: 20px;
          color: var(--el-text-color-primary);
          margin: 0px 0 45px 0;
          animation-delay: 0.1s;
        }
        .left-item-msg {
          color: var(--el-text-color-secondary);
          font-size: 12px;
          margin-bottom: 30px;
          animation-delay: 0.2s;
        }
        .left-item-btn {
          animation-delay: 0.2s;
        }
      }
    }
    .right {
      flex: 1;
      opacity: 0;
      animation-name: error-img;
      animation-duration: 2s;
      animation-fill-mode: forwards;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
