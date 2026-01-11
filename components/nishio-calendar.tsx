import { NishioCalendarInteractive } from '@/components/nishio-calendar-interactive'
import { NishioCalendarView } from '@/components/nishio-calendar-view'
import { NishioTweetList } from '@/components/nishio-tweet-list'

export function NishioCalendar() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 mt-6 mx-auto justify-center">
        {/* 日历组件 - 固定宽度 */}
        <div className="lg:min-w-[400px]">
          <NishioCalendarView />
        </div>

        {/* 推文展示区域 - 可滚动 */}
        <NishioTweetList />

        {/* 客户端交互逻辑注水 */}
        <NishioCalendarInteractive />
      </div>
    </>
  )
}
