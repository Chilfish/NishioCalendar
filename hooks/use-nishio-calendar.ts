import { useState, useEffect, useRef, useCallback } from "react"
import { getNishioEvents } from "@/lib/data"
import type { NishioEvent } from "@/lib/types"

export function useNishioCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<NishioEvent[]>([])
  const [visibleTweetIndex, setVisibleTweetIndex] = useState(0)
  const tweetsContainerRef = useRef<HTMLDivElement>(null)
  const tweetRefs = useRef<(HTMLDivElement | null)[]>([])

  // 初始化事件数据
  useEffect(() => {
    const fetchedEvents = getNishioEvents()
    setEvents(fetchedEvents)
  }, [])

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

  // 绑定滚动事件
  useEffect(() => {
    const container = tweetsContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleTweetScroll)
      return () => container.removeEventListener("scroll", handleTweetScroll)
    }
  }, [handleTweetScroll])

  // 滚动到指定推文
  const scrollToTweet = useCallback((index: number) => {
    if (tweetRefs.current[index]) {
      tweetRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [])

  return {
    // 状态
    date,
    setDate,
    events,
    visibleTweetIndex,
    
    // 引用
    tweetsContainerRef,
    tweetRefs,
    
    // 方法
    scrollToTweet,
  }
}