/**
 * Date and time processing method
 */

import dayjs from 'dayjs'

/**
 * Date time format
 * @param value
 * @returns
 */
export const formatDate = (value: dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
}

export const formatDateDDMMYYYY = (value: dayjs.ConfigType) => {
  return dayjs(value).format('DD/MM/YYYY')
}

export const formatDateDMY = (value: dayjs.ConfigType) => {
  return dayjs(value).format('DD-MM-YYYY')
}

export const dateFormatYMD = (value: dayjs.ConfigType) => {
  return formatDate(value, 'YYYY-MM-DD')
}

export const dateFormatYMDHMS = (value: dayjs.ConfigType) => {
  return formatDate(value, 'YYYY-MM-DD HH:mm:ss')
}

export const dateFormatHMS = (value: dayjs.ConfigType) => {
  return formatDate(value, 'HH:mm:ss')
}

export const dateFormatDMYHMSWithSlash = (value: dayjs.ConfigType) => {
  return formatDate(value, 'DD/MM/YYYY HH:mm:ss')
}

export const dateFormatDMY = (value: dayjs.ConfigType) => {
  return formatDate(value, 'DD-MM-YYYY')
}

/**
 * Get the week of the current date
 */
export function getWeek(dateTime: Date): number {
  const temptTime = new Date(dateTime.getTime())
  const weekday = temptTime.getDay() || 7
  temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
  let firstDay = new Date(temptTime.getFullYear(), 0, 1)
  const dayOfWeek = firstDay.getDay()
  let spendDay = 1
  if (dayOfWeek != 0) {
    spendDay = 7 - dayOfWeek + 1
  }
  firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
  const d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
  const result = Math.ceil(d / 7)
  return result
}
