<template>
  <div v-loading="tableData.loading">
    <el-table ref="tables" :max-height="maxHeight" @selection-change="selectionChange" :data="tableData.list" :cell-style="cellStyle" :header-cell-style="arrayHeaderMethod" empty-text="No record was found" :border="true" scrollbar-always-on @sort-change="handleSortChange" :stripe="true" :span-method="arraySpanMethod">
      <slot></slot>
    </el-table>
    <div v-if="tableData.pageInfo.PageCount > 1" class="pagination-container">
      <div class="pagination-total-container">
        &nbsp;&nbsp;&nbsp;
        <span style='font-weight: bold'>
          {{
          `Pages: ${tableData.pageInfo.currentPageIndex} / ${tableData.pageInfo.PageCount} (Records:
                ${tableData.pageInfo.recordCount})`
        }}
        </span>
        <el-pagination :current-page="tableData.pageInfo.currentPageIndex" layout="prev, pager, next" :total="tableData.pageInfo.recordCount" :pager-count="11" :page-size="tableData.pageInfo.pageSize" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export interface PaginationType {
  currentPageIndex: number
}

export type SortType<T> = {
  column: TableColumnCtx<T | any>
  prop: string
  order: string
}

const props = defineProps({
  tableData: {
    default: true,
    type: Object
  },
  background: {
    type: Boolean,
    default: true
  },
  selectionChange: {
    type: Function,
    default: () => {}
  },
  spanMethod: {
    type: Function,
    default: null
  },
  headerMethod: {
    type: Function,
    default: null
  },
  cellStyle: Function,
  maxHeight: {
    type: Number,
    default: null
  }
})

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (props.spanMethod) {
    return props.spanMethod(row, column, rowIndex, columnIndex)
  }
  return [1, 1]
}

const arrayHeaderMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (props.headerMethod) {
    return props.headerMethod(row, column, rowIndex, columnIndex)
  }
}

const selectionChange = (val: any[]) => {
  emits('selectionChange', val)
}

const handleSortChange = ({ column, prop, order }: SortType<any>) => {
  emits('sort-change', { column, prop, order })
}

const handleCurrentChange = (currentPageIndex: number) => {
  tableData.value.pageInfo.currentPageIndex = currentPageIndex
  emits('update:currentPageIndex', tableData.value.pageInfo.currentPageIndex)
  emits('pagination', { currentPageIndex })
}

const emits = defineEmits({
  pagination: (value: PaginationType) => {
    return typeof value.currentPageIndex === 'number'
  },
  selectionChange: (val: any[]) => {
    return true
  },
  'update:currentPageIndex': (value: number) => {
    return typeof value === 'number'
  },
  'sort-change': (value: SortType<any>) => {
    return typeof value.column === 'object' && typeof value.prop === 'string' && typeof value.order === 'string'
  }
})

const store = useStore()
const tableData = ref(props.tableData)
</script>

<style lang="scss" scoped>
.pagination-total-container {
  width: 100%;
  min-width: 100%;
  height: 30px;
  margin-right: 20px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
}

::v-deep(.el-select--default) {
  padding: 0 10px !important;
}

::v-deep(.el-pagination__sizes) {
  margin-right: 100px;
}
</style>
