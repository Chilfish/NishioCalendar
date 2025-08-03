"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isToday } from "date-fns";
import { getDateDisplayInfo } from "@/lib/nishio-calendar-utils";
import { useEventStore } from "@/stores/eventStore";

export function NishioCalendarView() {
  const { currentDate } = useEventStore();

  // 自定义日期内容渲染
  const renderDayContent = (day: Date | undefined) => {
    if (!day) {
      return null;
    }

    const dateInfo = getDateDisplayInfo(day);
    const isTodayDate = isToday(day);

    // 普通日期
    if (!dateInfo.isNishio) {
      return (
        <div
          className={`flex items-center justify-center w-full h-full ${
            isTodayDate ? "bg-primary text-white rounded-full font-medium" : ""
          }`}
        >
          {dateInfo.birthdayCount ? (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <span className="relative">{dateInfo.day}</span>
                </TooltipTrigger>

                <TooltipContent
                  side="bottom"
                  className="bg-white border border-gray-200 shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">
                      {dateInfo.birthdayCount}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            dateInfo.day
          )}
        </div>
      );
    }

    // 西尾日
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
              <span className="font-bold text-primary text-sm">
                {dateInfo.nishioNumber}
              </span>
            </div>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            className="bg-white border border-gray-200 shadow-lg"
          >
            <div className="space-y-1">
              {dateInfo.birthdayCount && (
                <div className="text-xs text-gray-500">
                  {dateInfo.birthdayCount}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="bg-card backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
      <Calendar
        mode="single"
        selected={undefined}
        month={currentDate}
        className="rounded-lg mx-auto sm:w-92 w-full"
        components={{
          DayButton: ({ day }) => {
            const customContent = renderDayContent(day.date);
            return (
              <div className="w-full h-full relative">{customContent}</div>
            );
          },
        }}
      />
    </div>
  );
}
