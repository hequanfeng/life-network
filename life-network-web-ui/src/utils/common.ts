import { store } from '../store'
import { TipsInfoType } from '@/store/modules/app-config-module'

export const setSuccessTipsInfo = (info: string) => {
  store.commit('appConfigModule/SET_TIPS_INFO', {
    type: 'success',
    info: info.split('||')
  })
}

export const clearTipsInfo = () => {
  store.commit('appConfigModule/CLEAR_TIPS_INFO', {})
}

export const setErrorsTipsInfo = (info: Array<string>) => {
  store.commit('appConfigModule/SET_TIPS_INFO', {
    type: 'error',
    title: 'Errors:',
    info: info
  })
}

export const setKeepAlive = (fileName: string) => {
  store.commit('appConfigModule/SET_KEEP_ALIVE', fileName)
}
export const removeKeepAlive = (fileName: string) => {
  store.commit('appConfigModule/REMOVE_KEEP_ALIVE', fileName)
}

export const formatBooleanToString = (value: string) => {
  return value == 'Y' ? true : false
}

export const setTipsInfoType = (value: TipsInfoType) => {
  return store.commit('appConfigModule/SET_TIPS_INFO_TYPE', value)
}

export const shortcutsDefault = [
  {
    text: 'Today',
    value: new Date()
  }
]

export function floatCheckOnBlur(e: Event, scale: number, allowNegative: boolean = false): string {
  const el = e.target as HTMLInputElement
  let val: any = el.value
  if (val != '') {
    val = parseFloat(val)
    if (isNaN(val)) {
      el.value = ''
      el.focus()
    } else {
      if (!allowNegative) {
        val = Math.abs(val)
      }
      el.value = val.toFixed(scale)
    }
  }
  return el.value
}

export function floatCheckOnBlurReturn(e: Event, scale: number) {
  const el = e.target as HTMLInputElement
  floatCheckOnBlur(e, scale)
  return el.value
}

export function processCode(val: string): string {
  val = toUpperCase(val)
  val = ignoreQuotes(val)
  val = trimObj(val)
  return val
}

export function checNumberText(val: string): string {
  val = val.replace(/(0\.|[0-9])/, '$1')
  val = val.replace(/[^\d.]/g, '')
  val = val.replace(/^\./g, '')
  val = val.replace(/\.{1,}/g, '.')
  val = val.replace(/^(\-)*(\d*)\.(\d).*$/, '$1$2.$3')
  return val
}

export function trimObj(val: string): string {
  return val.trim()
}

export function toUpperCase(val: string): string {
  return val.toUpperCase()
}

//number char check,accept "0-9"
export function numberTextCheck(val: string): string {
  return val.replace(/[^0-9]/g, '')
}

export function numberTextKeyPressCheck(val: string): string {
  let value
  if(val){
    value=val.replace(/[^0-9]/g, '')
  }else{
    value='0'
  }
  return value
}

export function ignoreQuotes(val: string): string {
  val = val.replace(/['"]+/g, '')
  return val
}

export function clearTableDataQuery(resetQuery: () => void, tableData: any): void {
  resetQuery()
  tableData.pageInfo = {
    curPageNo: 1,
    offset: 0,
    pageSize: 15,
    totalCount: 0,
    pagingType: 5,
    totalPage: 0,
    pagingOrNot: true,
    initPage: false
  }
}

export function checkLength(maxlen: number, obj: string) {
  let textValue = trimObj(obj)
  let bytelen = textValue.length
  if (bytelen > maxlen) {
    setErrorsTipsInfo(['Length of this field should not exceed 60'])
    return false
  } else {
    return true
  }
}

export function postNumberCheck(val: string): string {
  return val.replace(/[^1-9.]/g, '')
}

export function formatPaxValue(title: any, value: any) {
  var v = value + ''
  var newValue = formatCurrency(v)
  if (checkTitleIsPax(title)) return newValue.substring(0, newValue.lastIndexOf('.'))
  else return newValue
}

export function formatCurrency(num: any) {
  num = num.toString().replace(/\$|\,/g, '')
  if (isNaN(num)) num = '0'
  let sign = num == (num = Math.abs(num))
  num = Math.floor(num * 100 + 0.50000000001)
  let cents: any = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) cents = '0' + cents
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
  return (sign ? '' : '-') + num + '.' + cents
}

export function checkTitleIsPax(text: any) {
  if (text && text.indexOf('PAX') > -1) return true
  return false
}

export function floatCheckOnKeyPressAllowNegative(value: string, maxlen: number, scale: number): string {
  value = value.replace(/(0\.|[0-9])/, '$1')
  value = value.replace(/[^0-9\-\.]/g, '')
  if (value.lastIndexOf('-') !== 0 && value.lastIndexOf('-') !== -1) {
    value = '-' + value.replace(/\-*/g, '')
  }
  value = value.replace(/^\./g, '')
  value = value.replace(/\.{1,}/g, '.')
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  if (scale === 2) {
    value = value.replace(/^(\-)*(\d*)\.(\d\d).*$/, '$1$2.$3')
  } else if (scale === 4) {
    value = value.replace(/^(\-)*(\d*)\.(\d\d\d\d).*$/, '$1$2.$3')
  }
  maxlen = value.includes('-') ? maxlen + 1 : maxlen
  value = value.includes('.') ? value.split('.')[0].substring(0, maxlen) + '.' + value.split('.')[1] : value.substring(0, maxlen)
  return value
}

function replaceInvalidChar(value: string, allowCharList: string) {
  if (value !== null && value !== undefined) {
    for (let i = 0; i < value.length; i++) {
      if (!allowCharList.includes(value[i])) {
        value = value.replace(value[i], '')
      }
    }
    value = value.toUpperCase()
  }
  return value
}

export function convertToUpperLetter(value: string) {
  if (value !== null && value !== undefined) {
    value = value.toUpperCase()
  }
  return value
}

export function ReprotCategoryOrderCheck(value: string) {
  const allowCharList = '0123456789'
  return replaceInvalidChar(value, allowCharList)
}

export function NumberCheck(value: string) {
  const allowCharList = '0123456789'
  return replaceInvalidChar(value, allowCharList)
}

export function intCheck(value) {
  value = value.replace(/(0\.|[0-9])/, '$1')
  value = value.replace(/[^0-9\-\.]/g, '')
  if (value.lastIndexOf('-') !== 0 && value.lastIndexOf('-') !== -1) {
    value = '-' + value.replace(/\-*/g, '')
  }
  value = value.replace(/^\./g, '')
  value = value.replace(/\.{1,}/g, '.')
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  return value
}

export function checkOnKeypress(value: string): string {
  const allowCharList = '0123456789ASDFGHJKLQWERTYUIOPZXCVBNMasdfghjklqwertyuiopzxcvbnm/'
  return replaceInvalidChar(value, allowCharList)
}

export function textareaLengthCheck(val: string) {
  //alert(temp.length);
  if (val.length >= 250) {
    return val.substring(0, 250)
  } else {
    return val
  }
}

export function DecimalTrimZero(val: any) {
  if (val) {
    if (isNaN(val)) {
      val = ''
    } else {
      val = parseFloat(val)
    }
  }
  return val
}

export function numberCheckOnBlur(e: FocusEvent): string {
  const el = e.target as HTMLInputElement
  let val: any = el.value
  if (val != '') {
    val = parseInt(val, 10)
    if (isNaN(val)) {
      el.value = ''
      el.focus()
    } else {
      val = Math.abs(val)
      el.value = val
    }
  }
  return el.value
}

export function numberCheckOnBlurReplaceZero(val: string) {
  let value = numberTextCheck(val)
  if(parseInt(value, 10) > 0){
    return value
  }
  return '0';
}

export function numberCheckOnBlurReturn(e: FocusEvent) {
  const el = e.target as HTMLInputElement
  numberCheckOnBlur(e)
  return el.value
}

export function numberCheckOnKeyPress(value: string, allowNegative: boolean = false) {
  let allowCharList = '0123456789'
  if (allowNegative) {
    allowCharList += '-'
  }

  value = replaceInvalidChar(value, allowCharList)

  if (allowNegative && typeof value === 'string' && value.length > 0 && value.includes('-') && value.lastIndexOf('-') !== 0) {
    value = '-' + value.replaceAll('-', '')
  }

  return value
}
export function numberCheckInput(value: string) {
  let val = value.substring(0, 1)
  if (val.includes('-')) {
    value = '-' + value.replace(/[^0-9]/g, '')
  } else {
    value = value.replace(/[^0-9]/g, '')
  }

  return value
}
