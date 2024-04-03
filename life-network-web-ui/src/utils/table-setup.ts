import { reactive } from 'vue'

export interface PageInfo {
  currentPageIndex: number
  pageSize: number
  recordCount: number
  pageButtonCount: number
  PageCount: number
}

export interface TableDataType<T, K> {
  list: T[]
  selectionList: T[] // Selected list data
  loading: boolean
  pageInfo: PageInfo
  query: K
}

export interface TableResponseType<T> {
  data?: {
    searchResults: [],
    currentPageIndex: 1,
    recordCount: 0,
    pageButtonCount: 10,
    pageSize: 20,
    PageCount: 0,
    targetID1: ''
  }
  pageInfo: PageInfo
}

export function useTableData<T = any[], K = Record<string, any>>(query: K) {
  const tableData = reactive<TableDataType<T, K>>({
    list: [],
    selectionList: [],
    loading: false,
    pageInfo: {
      currentPageIndex: 1,
      pageSize: 20,
      PageCount: 0,
      recordCount: 0,
      pageButtonCount: 10
    },
    query: query
  })
  return tableData
}

export function mergePageInfo(tableData: { pageInfo: PageInfo }, data: TableResponseType<any>) {
  tableData.pageInfo.currentPageIndex = data.data.currentPageIndex
  tableData.pageInfo.pageButtonCount = data.data.pageButtonCount
  tableData.pageInfo.pageSize = data.data.pageSize
  tableData.pageInfo.recordCount = data.data.recordCount
  tableData.pageInfo.PageCount = Math.ceil(tableData.pageInfo.recordCount / (tableData.pageInfo.pageSize))
}
