"use client";

import { useNishioCalendar } from "@/hooks/use-nishio-calendar";
import { NishioCalendarView } from "@/components/nishio-calendar-view";
import { NishioTweetList } from "@/components/nishio-tweet-list";

export function NishioCalendar() {
  const {
    date,
    setDate,
    events,
    visibleTweetIndex,
    tweetsContainerRef,
    tweetRefs,
  } = useNishioCalendar();

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-6">
      {/* 日历组件 - 固定宽度 */}
      <div className="lg:min-w-[400px]">
        <NishioCalendarView date={date} onDateChange={setDate} />
      </div>

      {/* 推文展示区域 - 可滚动 */}
      <NishioTweetList
        ref={tweetsContainerRef}
        events={events}
        visibleTweetIndex={visibleTweetIndex}
        tweetRefs={tweetRefs}
      />
    </div>
  );
}
