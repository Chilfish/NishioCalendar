import type { NishioEvent } from '@/lib/types'
import { create } from 'zustand'
import { nishioEvents } from '@/lib/data'

interface EventStore {
  // 状态
  events: NishioEvent[]
  currentDate: Date
  visibleTweetIndex: number

  // 动作
  setEvents: (events: NishioEvent[]) => void
  setCurrentDate: (date: Date) => void
  setVisibleTweetIndex: (index: number) => void

  // 复合动作
  syncCalendarFromScroll: (index: number) => void
}

export const useEventStore = create<EventStore>((set, get) => ({
  // 初始状态
  events: nishioEvents,
  currentDate: new Date(),
  visibleTweetIndex: 0,

  // 基础动作
  setEvents: events => set({ events }),
  setCurrentDate: date => set({ currentDate: date }),
  setVisibleTweetIndex: index => set({ visibleTweetIndex: index }),

  // 复合动作：从滚动同步日历
  syncCalendarFromScroll: (index) => {
    const { events } = get()
    if (events[index]) {
      set({
        visibleTweetIndex: index,
        currentDate: events[index].realDate,
      })
    }
  },
}))
