"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, Twitter } from "lucide-react"
import { format, isLastDayOfMonth, isSameDay, isPast, differenceInDays, isToday } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { NishioEvent } from "@/lib/types"
import { getNishioEvents } from "@/lib/data"

export function NishioCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<NishioEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [visibleTweetIndex, setVisibleTweetIndex] = useState(0)
  const tweetsContainerRef = useRef<HTMLDivElement>(null)
  const tweetRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchedEvents = getNishioEvents()
    setEvents(fetchedEvents)
  }, [])

  // 3月31日生日基准日期
  const birthdayBase = new Date(2024, 2, 31) // March 31, 2024

  // 检查是否为西尾日（每月最后一天）
  const isNishioDay = (day: Date) => {
    return isLastDayOfMonth(day)
  }

  // 获取西尾历日期显示
  const getNishioDateDisplay = (day: Date) => {
    if (isLastDayOfMonth(day)) {
      const month = day.getMonth() + 1
      return `${month}月32日`
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

  // 查找对应的西尾事件
  const findNishioEvent = (day: Date) => {
    return events.find((event) => isSameDay(event.realDate, day))
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
    const nishioEvent = isNishio ? findNishioEvent(day) : null
    const isPastDay = isPast(day)
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
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
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
                ${isPastDay && nishioEvent ? "cursor-pointer" : "cursor-default"}
                bg-primary/10 hover:bg-primary/15 transition-all duration-200
                border-2 border-primary/20
                ${isTodayDate ? "ring-2 ring-primary" : ""}
              `}
              onClick={(e) => {
                if (isPastDay && nishioEvent) {
                  e.stopPropagation()
                  setSelectedDate(day)
                  // 滚动到对应的推文
                  const eventIndex = events.findIndex((event) => isSameDay(event.realDate, day))
                  if (eventIndex !== -1 && tweetRefs.current[eventIndex]) {
                    tweetRefs.current[eventIndex]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }
                }
              }}
            >
              <span className="font-bold text-primary text-sm">32</span>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-whitem border border-gray-200 shadow-lg max-w-xs"
          >
            <div className="space-y-2">
              <div className="font-medium text-primary">西尾历: {nishioDisplay}</div>
              {birthdayCount && <div className="text-xs text-gray-500">生日计时: {birthdayCount}</div>}
              {nishioEvent && <div className="text-sm text-gray-600">{nishioEvent.tweetText}</div>}
              {isPastDay && nishioEvent ? (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Twitter className="w-3 h-3" />
                  点击查看推文
                </div>
              ) : (
                <div className="text-xs text-gray-400">{isPastDay ? "西尾日" : "未来的西尾日"}</div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const selectedEvent = selectedDate ? findNishioEvent(selectedDate) : null

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
            每月的第一天，都是上个月的第32天，由
            <a
              href="https://twitter.com/240y_k"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mx-1 font-medium"
            >
              西尾夕香
            </a>
            开创的特殊历法。在这个独特的时间体系中，每个月的最后一天都被赋予了特殊的意义。
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
                DayContent: ({ date: dayDate }) => renderDayContent(dayDate),
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
              <motion.div
                key={index}
                ref={(el) => (tweetRefs.current[index] = el)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50
                  ${index === visibleTweetIndex ? "ring-2 ring-primary/20" : ""}
                  transition-all duration-300
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    西
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">西尾夕香</span>
                        <span className="text-gray-500 text-sm ml-2">@240y_k</span>
                        <span className="text-gray-400 text-xs ml-2">
                          {format(event.realDate, "yyyy年M月d日", { locale: zhCN })}
                        </span>
                      </div>
                      <Badge className="bg-primary/10 text-primary text-xs">{event.nishioDate}</Badge>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">{event.tweetText}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 选中日期详情 */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">选中的西尾日</h4>
              <Badge className="bg-primary text-white">{selectedEvent.nishioDate}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{selectedEvent.tweetText}</p>
            <a
              href={selectedEvent.tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            >
              <Twitter className="w-4 h-4" />
              查看原始推文
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
