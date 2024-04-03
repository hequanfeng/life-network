<template>
  <div class="layout-navbars-breadcrumb">
    <div class="collapse-box" @click="onCollapse">
      <div :class="store.state.appConfigModule.isCollapse ? 'arrows-left' : 'arrows-right'"></div>
    </div>
    <el-breadcrumb :separator-icon="ArrowRight" class="layout-navbars-breadcrumb-hide">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
          <span :class="index === breadcrumbList.length - 1 ? 'layout-navbars-breadcrumb-span' : 'layout-navbars-breadcrumb-click'" @click="index !== breadcrumbList.length - 1 && onBreadcrumbClick(item)">
            <span v-if="item.meta.isMenu"> {{ item.meta.title }} </span>
            <span v-else> {{ item.meta.fileName }} </span>
          </span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, RouteRecordNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ArrowRight } from '@element-plus/icons-vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const breadcrumbList = ref<RouteRecordNormalized[]>([]);

const onBreadcrumbClick = (value: RouteRecordNormalized) => {
  router.push(value.path);
};

const onCollapse = () => {
  store.commit('appConfigModule/SET_IS_COLLAPSE', !store.state.appConfigModule.isCollapse);
};

const getBreadcrumbList = (queryList: string[]) => {
  const routers = router.getRoutes();
  const breadcrumbData: { index: number; value: RouteRecordNormalized }[] = [];
  const queryPathLen = queryList.length;
  for (let index = 0; index < routers.length; index++) {
    const element = routers[index];
    if (breadcrumbData.length === queryPathLen) {
      break;
    }
    const arrIndex = queryList.indexOf(element.path);
    if (arrIndex !== -1) {
      breadcrumbData.push({
        index: arrIndex,
        value: element
      });
    }
  }
  const routeList: RouteRecordNormalized[] = [];
  for (let index = 0; index < breadcrumbData.length; index++) {
    const element = breadcrumbData[index];
    if (element.value.path === '/') {
      element.value.meta.screenID = 'Home';
      element.value.meta.title = 'Home';
    }
    routeList[element.index] = element.value;
  }
  breadcrumbList.value = routeList;
};

/**
 * The current route string is cut into an array and the first empty content is deleted
 */
const initRouteSplit = (path: string) => {
  const queryPathStr: string[] = [];
  const pathSplit = path.split('/');
  for (let index = 0; index < pathSplit.length; index++) {
    const element = pathSplit[index];
    const queryPathStrLen = queryPathStr.length;
    const pathStr = queryPathStrLen === 0 ? '' : queryPathStr[queryPathStrLen - 1];
    const str = pathStr + (queryPathStrLen === 1 ? '' : '/');
    queryPathStr.push(str + element);
  }

  getBreadcrumbList(queryPathStr);
};

onMounted(() => {
  initRouteSplit(route.path);
});

onBeforeRouteUpdate((to) => {
  initRouteSplit(to.path);
});
</script>

<style scoped lang="scss">
.collapse-box {
  border-right: 1px solid #d1d1d1;
  border-left: 1px solid #d1d1d1;
  height: 40px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  padding-left: 2px;
}
.arrows-right {
  width: 0px;
  margin-right: 3px;
  height: 5px;
  position: relative;
  border: 5px solid #333;
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-left: transparent;
}

.arrows-left {
  width: 0px;
  margin-left: 1px;
  margin-right: 2px;
  height: 5px;
  position: relative;
  border: 5px solid #333;
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-right: transparent;
}
.collapse-box:hover > .arrows-left {
  border: 5px solid #004080;
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-right: transparent;
}
.collapse-box:hover {
  background-color: #d1f2ff;
}
.collapse-box:hover > .arrows-right {
  border: 5px solid #004080;
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-left: transparent;
}
.layout-navbars-breadcrumb {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
  padding-left: 0px;
  .layout-navbars-breadcrumb-span {
    opacity: 0.7;
  }
  .layout-navbars-breadcrumb-click {
    cursor: pointer;
  }
  .layout-navbars-breadcrumb-iconfont {
    margin-right: 5px;
  }
  ::v-deep(.el-breadcrumb__separator) {
    opacity: 0.7;
    color: #333333;
  }
}
</style>
