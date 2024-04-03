<template>
  <div class="layout-navbars-user">
    <i class="fa fa-calendar iconfont" aria-hidden="true"></i><span class="layout-navbars-date">{{ nowDate }}</span>
    <el-avatar :icon="UserFilled" />
    <span class="layout-navbars-user-title" @click="onHandleLoginOut">{{ getUserInfos.userName }} <i class="fa fa-sign-out iconfont" aria-hidden="true"></i></span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Request } from '@/utils/request'
import { ElMessageBox, ElNotification } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { dateFormatYMD } from '@/utils/format-time'
import { resetRoute } from '@/router'
const { proxy } = getCurrentInstance()

const store = useStore()
const router = useRouter()
const getUserInfos = computed(() => {
  return store.state.userInfosModule.userInfos
})

const nowDate = ref(dateFormatYMD(new Date()))

const onHandleLoginOut = () => {
  ElMessageBox({
    closeOnClickModal: false,
    closeOnPressEscape: false,
    type: 'warning',
    title: proxy?.$t('i18n.user.logOutTitle'),
    message: proxy?.$t('i18n.user.logOutMessage'),
    showCancelButton: true,
    confirmButtonText: proxy?.$t('i18n.user.logOutConfirm'),
    cancelButtonText: proxy?.$t('i18n.user.logOutCancel'),
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        Request({
          url: '/TRM_WEB/api/logout'
        }).then(() => {
          done()
          instance.confirmButtonLoading = false
        })
      } else {
        done()
      }
    }
  })
    .then(async () => {
      resetRoute()
      await store.dispatch('userInfosModule/serUserLogOut')
      await router.push('/login')
      ElNotification({
        title: proxy?.$t('i18n.user.logOutTitle'),
        message: proxy?.$t('i18n.user.logOutSuccess'),
        type: 'success'
      })
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.layout-navbars-date {
  margin-left: 15px;
  margin-right: 15px;
  color: #ffffff;
}
.layout-navbars-user {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 15px;
  .el-avatar--icon {
    background-color: #899299;
    font-size: 40px;
    padding-top: 5px;
  }
  .layout-navbars-user-title {
    margin-left: 15px;
    color: #ffffff;
    cursor: pointer;
  }
  .iconfont {
    color: #ffffff;
    font-size: 17px;
    margin-left: 10px;
  }
}
</style>
