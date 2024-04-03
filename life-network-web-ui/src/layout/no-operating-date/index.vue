<template>
  <div class="error">
    <div class="error-flex">
      <div class="left">
        <div class="left-item">
          <!-- <div class="left-item-animation left-item-num">Tips</div> -->
          <div class="left-item-animation left-item-num">
            <el-icon><WarningFilled /></el-icon> Tips
          </div>
          <div class="left-item-animation left-item-title">No active operating date found</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue'
</script>

<style scoped lang="scss">
.error {
  background-color: var(--el-color-warning-light-9);
  display: flex;
  border-radius: 10px;
  border: 1px solid #eee;
  .error-flex {
    margin: 20px 20px;
    display: flex;
    .left {
      flex: 1;
      height: 100%;
      display: flex;
      .left-item {
        .left-item-animation {
          opacity: 0;
          animation-name: error-num;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }
        .left-item-num {
          color: var(--el-color-error);
          font-size: 20px;
          font-weight: bold;
        }
        .left-item-title {
          font-size: 18px;
          color: var(--el-text-color-primary);
          margin: 10px 0 5px 0;
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
