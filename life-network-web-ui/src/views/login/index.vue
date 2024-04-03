<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-logo">
        <div class="logo-container">
          <svg-icon name="svg-mtr" />
        </div>
        <div class="text-neutral-8">
          {{ $t('i18n.settings.systemName') }}
        </div>
      </div>
      <div class="tipsInfo">
        <el-alert :type="tipsInfo.type" :title="tipsInfo.title" v-if="tipsInfo.info.length > 0" @close="clearTipsInfo">
          <div v-for="(item, index) in tipsInfo.info" :key="index">
            {{ item }}
          </div>
        </el-alert>
      </div>
      <div class="login-form-main">
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="0px" size="large">
          <el-form-item prop="j_username">
            <el-input v-model="loginForm.j_username" @input="loginForm.j_username = toUpperCase($event)" name="username" :placeholder="$t('i18n.login.account.username')">
              <template #prefix>
                <el-icon class="el-input__icon"><user /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="j_password">
            <el-input v-model="loginForm.j_password" type="password" name="password" class="login-input-bg" :placeholder="$t('i18n.login.account.password')" show-password
              ><template #prefix>
                <el-icon class="el-input__icon"><lock /></el-icon> </template
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="btn-login" size="large" type="primary" :loading="loading" @click="submitForm(loginFormRef)">{{ $t('i18n.login.account.login') }}</el-button>
            <el-button class="btn-reset" size="large" @click="onResetForm(loginFormRef)">{{ $t('i18n.login.account.reset') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { toUpperCase } from '@/utils/common';
import { Request } from '@/utils/request';
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import SvgIcon from '@/components/svg-icon/svg-icon.vue';
import { Session } from '@/utils/storage';
import qs from 'qs';

interface UserLoginType {
  login: string;
}
interface LoginFromType {
  username: string;
  password: string;
}
const store = useStore();
const route = useRoute();
const router = useRouter();
const loading = ref(false);

const tipsInfo = computed(() => {
  return store.state.appConfigModule.tipsInfo;
});

onMounted(() => {
  keydownEvent();
});

const keydownEvent = () => {
  document.onkeydown = (e: any) => {
    if (e.defaultPrevented) {
      return;
    }
    if (e.keyCode === 13) {
      submitForm(loginFormRef.value);
    }
  };
};

const clearTipsInfo = () => {
  store.commit('appConfigModule/CLEAR_TIPS_INFO');
};

const loginFormRef = ref<FormInstance>();

const loginForm = reactive({
  j_username: 'KFUNGAPJ',
  j_password: 'abc123',
  actionValue: 'Login'
});

const disabledI18n = computed(() => {
  return store.state.appConfigModule.globalI18n;
});

const loginRules = ref<FormRules>({
  j_username: [
    {
      required: true,
      message: 'The user name should not be blank',
      trigger: 'change'
    }
  ],
  j_password: [
    {
      required: true,
      message: 'The password should not be blank',
      trigger: 'change'
    }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginUser();
    } else {
      console.log('error submit!', fields);
    }
  });
};
const loginUser = () => {
  loading.value = true;
  Request({
    method: 'POST',
    url: '/TRM_WEB/api/login',
    data: qs.stringify(loginForm)
  })
    .then((res) => {
      console.log(res);
      loginResult();
    })
    .catch(function (err) {
      console.info(err);
      loginResult();
    });
};

const loginResult = () => {
  Request({
    method: 'POST',
    url: '/TRM_WEB/api/login',
    data: qs.stringify({ j_username: loginForm.j_username, actionValue: 'Result' })
  })
    .then((res: any) => {
      if (res.data.info == 'Success') {
        const token = Math.random().toString(36);
        // const roles = res.data.roles?.replace(/,$/gi, '')
        const userInfos = {
          userName: loginForm.j_username,
          token: token
          // roles: roles?.split(',')
        };
        store.dispatch('userInfosModule/setUserInfos', userInfos);
        signInSuccess();
      } else {
        loading.value = false;
        store.commit('appConfigModule/SET_TIPS_INFO', {
          type: 'error',
          title: 'Errors:',
          info: res.data.errors
        });
      }
    })
    .catch(function (err) {
      console.info(err);
      if (err.response.data.includes('SESN0008E')) {
        router.push('/403');
      } else {
        loading.value = false;
        ElMessage.error(err.message);
      }
    });
};

const signInSuccess = () => {
  loading.value = false;
  const routeQueryInfo = route.query;
  const auth = routeQueryInfo.auth as string | undefined;
  if (auth == '0') {
    router.push({ name: Session.get<any>('historyName'), query: Session.get<any>('params') });
  } else {
    router.push('/');
  }
};

const onResetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.btn-login,
.btn-login:hover,
.btn-login:visited,
.btn-login:focus,
.btn-login:active {
  width: 100%;
  background-color: #2c3c53;
  border: 0px;
  margin-top: 10px;
}
.btn-reset,
.btn-reset:hover,
.btn-reset:visited,
.btn-reset:focus,
.btn-reset:active {
  width: 100%;
  margin-top: 10px;
  margin-left: 0px;
}
.tipsInfo {
  padding: 0px;
  width: 100%;
  min-height: 20px;
}
.login-container {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: #11254a;
  background-image: url('@/assets/login-bg.png');
  background-size: cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .login-form {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    background-color: #ffffff;
    width: 470px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 470px;
    .login-logo {
      height: 160px;
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
      text-align: center;
      background: #cef0fe;
      .logo-container {
        display: flex;
        align-items: center;
        height: 60px;
        margin-top: 15px;
        margin-bottom: 15px;
        flex-direction: column;
        justify-content: flex-end;
      }
    }
    .login-form-main {
      width: 65%;
      padding: 10px 0px 0px 0px;
      ::v-deep(.el-input__prefix),
      ::v-deep(.el-input__inner),
      ::v-deep(.el-input__password),
      ::v-deep(.el-input__inner::-webkit-input-placeholder) {
        color: #ffffff;
      }
      ::v-deep(.el-input__wrapper) {
        background-image: linear-gradient(to right, #015ca1, #25a8df);
        border: 0px;
        box-shadow: 0 0 0 0px;
      }
    }
  }
}
.advice {
  margin-top: 10px;
}
.text-neutral-8 {
  color: rgb(17, 37, 74);
  font-size: 20px;
  font-weight: bold;
}
</style>
