<template>
  <div v-if="pagingOrNot" class="pagination-container">
    <el-pagination :current-page="currentPage" :background="background" :total="total" :layout="layout" :page-size="pageSize" :pager-count="5" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      ><div class="pagination-total-container" key="1">
        {{ page + ' of ' + pageSize }}
      </div></el-pagination
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

export interface PaginationType {
  page: number;
  limit: number;
}

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    required: true
  },
  background: {
    type: Boolean,
    default: true
  },
  pagingOrNot: {
    type: Boolean,
    default: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  layout: {
    type: String,
    default: 'slot,jumper,->, prev, pager, next'
  }
});

const emits = defineEmits({
  pagination: (value: PaginationType) => {
    return typeof value.page === 'number' && typeof value.limit === 'number';
  },
  'update:page': (value: number) => {
    return typeof value === 'number';
  }
});

const store = useStore();
const currentPage = ref(props.page);
const pageSize = ref(props.pageSize);

const handleSizeChange = (val: number) => {
  emits('pagination', { page: currentPage.value, limit: val });
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  // emitter.emit('mittPagination')
  emits('update:page', val);
  emits('pagination', { page: val, limit: pageSize.value });
};
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #dee5eb;
  padding: 3px 0;
  border-radius: 0px 0px 0px 0px;
}
.pagination-total-container {
  margin-left: 10px;
  margin-right: 100px;
}
::v-deep(.el-select--default) {
  padding: 0 10px !important;
}
::v-deep(.el-pagination__sizes) {
  margin-right: 100px;
}
</style>
