"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { CalendarIcon } from "lucide-react"
import { format, differenceInDays, isToday } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { NishioEvent } from "@/lib/types"
import { getNishioEvents } from "@/lib/data"
import { NishioTweetCard } from "@/components/nishio-tweet-card"

export function NishioCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<NishioEvent[]>([])
  const [visibleTweetIndex, setVisibleTweetIndex] = useState(0)
  const tweetsContainerRef = useRef<HTMLDivElement>(null)
  const tweetRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchedEvents = getNishioEvents()
    setEvents(fetchedEvents)
  }, [])

  // 3月31日生日基准日期
  const birthdayBase = new Date(2024, 2, 31) // March 31, 2024

  // 检查是否为西尾日（只有每月第一天）
  const isNishioDay = (day: Date) => {
    return day.getDate() === 1
  }

  // 获取西尾历日期显示
  const getNishioDateDisplay = (day: Date) => {
    if (day.getDate() === 1) {
      // 每月第一天显示为上个月32日
      const prevMonth = day.getMonth() === 0 ? 12 : day.getMonth()
      return `${prevMonth}月32日`
    }
    return null
  }

  // 获取从生日开始的天数计算
  const getBirthdayCount = (day: Date) => {
    if (day >= birthdayBase) {
      const daysDiff = differenceInDays(day, birthdayBase)
      return `3月${31 + daysDiff}日`
    }
    return null
  }



  // 获取西尾历显示的数字
  const getNishioDisplayNumber = (day: Date) => {
    if (day.getDate() === 1) {
      return "32"
    }
    return day.getDate().toString()
  }

  // 处理推文滚动，同步日历
  const handleTweetScroll = useCallback(() => {
    if (!tweetsContainerRef.current) return

    const container = tweetsContainerRef.current

    // 找到当前可见的推文
    let currentIndex = 0
    for (let i = 0; i < tweetRefs.current.length; i++) {
      const tweetElement = tweetRefs.current[i]
      if (tweetElement) {
        const rect = tweetElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        if (rect.top <= containerRect.top + containerRect.height / 2) {
          currentIndex = i
        } else {
          break
        }
      }
    }

    if (currentIndex !== visibleTweetIndex) {
      setVisibleTweetIndex(currentIndex)
      // 同步日历到对应的月份
      if (events[currentIndex]) {
        setDate(events[currentIndex].realDate)
      }
    }
  }, [events, visibleTweetIndex])

  useEffect(() => {
    const container = tweetsContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleTweetScroll)
      return () => container.removeEventListener("scroll", handleTweetScroll)
    }
  }, [handleTweetScroll])

  // 自定义日期内容渲染
  const renderDayContent = (day: Date | undefined) => {
    if (!day) {
      return null
    }

    const isNishio = isNishioDay(day)
    const nishioDisplay = getNishioDateDisplay(day)
    const birthdayCount = getBirthdayCount(day)
    const isTodayDate = isToday(day)

    if (!isNishio) {
      return (
        <div
          className={`flex items-center justify-center w-full h-full ${isTodayDate ? "bg-primary text-white rounded-full font-medium" : ""}`}
        >
          {birthdayCount ? (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <span className="relative">
                    {day.getDate()}
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-white border border-gray-200"
                >
                  <div className="text-xs">
                    <div className="font-medium">从生日开始计时</div>
                    <div className="text-primary">{birthdayCount}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            day.getDate()
          )}
        </div>
      )
    }

    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <div
              className={`
                flex items-center justify-center w-full h-full rounded-full 
                bg-primary/10 hover:bg-primary/15 transition-all duration-200
                border-2 border-primary/20
                ${isTodayDate ? "ring-2 ring-primary" : ""}
              `}
            >
              <span className="font-bold text-primary text-sm">{getNishioDisplayNumber(day)}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-white border border-gray-200 shadow-lg"
          >
            <div className="space-y-1">
              <div className="font-medium text-primary text-sm">{nishioDisplay}</div>
              {birthdayCount && <div className="text-xs text-gray-500">生日计时: {birthdayCount}</div>}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }



  return (
    <div className="space-y-8">
      {/* 介绍区域 */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900">西尾文明暦</h1>
          <div className="text-lg text-gray-500 font-light">Nishio Calendar</div>
        </div>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 leading-relaxed">
            每月的第一天，都变成上个月的第32天，由
            <a
              href="https://twitter.com/240y_k"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mx-1 font-medium"
            >
              西尾夕香
            </a>
            开创的特殊历法。在这个独特的时间体系中，每个月的第一天都被赋予了特殊的意义。
          </p>
        </div>
      </div>

      {/* 日历和推文主体 */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 日历组件 - 固定宽度 */}
        <div className="lg:w-fit lg:min-w-[400px]">
          <div className="bg-card backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 sticky top-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-medium text-gray-900">
                  {format(date, "yyyy年 MMMM", { locale: zhCN })}
                </h2>
              </div>
            </div>

            <Calendar
              mode="single"
              selected={undefined} // 不选择任何日期
              month={date}
              onMonthChange={setDate}
              className="rounded-lg mx-auto sm:w-92"
              locale={zhCN}
              components={{
                DayButton: ({ day }) => {
                  const customContent = renderDayContent(day.date)
                  return (
                    <div className="w-full h-full relative">
                      {customContent}
                    </div>
                  )
                },
              }}
            />
          </div>
        </div>

        {/* 推文展示区域 - 可滚动 */}
        <div className="flex-1 relative">
          <div
            ref={tweetsContainerRef}
            className="space-y-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {events.map((event, index) => (
              <div
                key={index}
                ref={(el) => {
                  tweetRefs.current[index] = el
                }}
                className={`
                  ${index === visibleTweetIndex ? "ring-2 ring-primary/20 ring-offset-2" : ""}
                  transition-all duration-300 rounded-xl
                `}
              >
                <NishioTweetCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}
