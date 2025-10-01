import type { NishioEvent } from '@/lib/types'
import { differenceInDays } from 'date-fns'

/**
 * 获取指定月份的天数
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/**
 * 获取上个月的年份和月份
 */
export function getPreviousMonth(year: number, month: number): { year: number, month: number } {
  if (month === 1) {
    return { year: year - 1, month: 12 }
  }
  return { year, month: month - 1 }
}

/**
 * 检查是否为西尾日（每月第一天）
 */
export function isNishioDay(date: Date): boolean {
  return date.getDate() === 1
}

/**
 * 获取西尾历显示
 * 每月第一天显示为上个月的(上个月天数+1)日
 */
export function getNishioDateDisplay(date: Date): string | null {
  if (!isNishioDay(date)) {
    return null
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() 返回 0-11，需要 +1

  const { year: prevYear, month: prevMonth } = getPreviousMonth(year, month)
  const prevMonthDays = getDaysInMonth(prevYear, prevMonth)

  return `${prevMonth}月${prevMonthDays + 1}日`
}

/**
 * 获取西尾历显示的数字
 */
export function getNishioDisplayNumber(date: Date): string {
  if (!isNishioDay(date)) {
    return date.getDate().toString()
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const { year: prevYear, month: prevMonth } = getPreviousMonth(year, month)
  const prevMonthDays = getDaysInMonth(prevYear, prevMonth)

  return (prevMonthDays + 1).toString()
}

/**
 * 获取指定年份的生日基准日期 (3月31日)
 */
export function getBirthdayBaseDate(year: number): Date {
  return new Date(year, 2, 31) // March 31
}

/**
 * 获取从生日开始的天数计算
 * 按照当前年份的3月31日作为基准，如果还没到当年3月31日，则用前一年的3月31日
 */
export function getBirthdayCountDisplay(date: Date): string | null {
  const currentYear = date.getFullYear()
  const currentYearBirthday = getBirthdayBaseDate(currentYear)

  // 确定应该使用哪一年的3月31日作为基准
  let baseDate: Date
  if (date < currentYearBirthday) {
    // 如果还没到当年的3月31日，使用前一年的3月31日
    baseDate = getBirthdayBaseDate(currentYear - 1)
  }
  else {
    // 如果已经过了当年的3月31日，使用当年的3月31日
    baseDate = currentYearBirthday
  }

  const daysDiff = differenceInDays(date, baseDate)
  return `3月${31 + daysDiff}日`
}

/**
 * 生成西尾历的事件数据辅助函数
 */
export function generateNishioEvent(data: Omit<NishioEvent, 'nishioDate'>) {
  const nishioDate = getNishioDateDisplay(data.realDate)

  if (!nishioDate) {
    throw new Error('提供的日期不是西尾日')
  }

  return {
    nishioDate,
    ...data,
  }
}

/**
 * 获取日期的月份名称和格式化信息
 */
export function getDateDisplayInfo(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    isNishio: isNishioDay(date),
    nishioDisplay: getNishioDateDisplay(date),
    nishioNumber: getNishioDisplayNumber(date),
    birthdayCount: getBirthdayCountDisplay(date),
  }
}
