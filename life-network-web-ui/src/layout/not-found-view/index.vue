<template>
  <div class="error" :style="{ height: `calc(100vh - ${height}` }">
    <div class="error-flex">
      <div class="left">
        <div class="left-item">
          <div class="left-item-animation left-item-num">404</div>
          <div class="left-item-animation left-item-title">{{ title }}</div>
          <div class="left-item-animation left-item-msg">
            {{ msg }}
          </div>
          <div class="left-item-animation left-item-btn">
            <el-button type="primary" round @click="onRouteGo">
              {{ $t('i18n.notFound.foundBtn') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue'
import { useRouter } from 'vue-router'

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

const onRouteGo = () => {
  router.go(-1)
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
        .left-item-animation {
          opacity: 0;
          animation-name: error-num;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }
        .left-item-num {
          color: var(--el-color-info);
          font-size: 125px;
        }
        .left-item-title {
          font-size: 20px;
          color: var(--el-text-color-primary);
          margin: 15px 0 5px 0;
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
