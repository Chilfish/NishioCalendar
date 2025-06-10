import { forwardRef, RefObject } from "react";
import { NishioTweetCard } from "@/components/nishio-tweet-card";
import type { NishioEvent } from "@/lib/types";

interface NishioTweetListProps {
  events: NishioEvent[];
  visibleTweetIndex: number;
  tweetRefs: RefObject<(HTMLDivElement | null)[]>;
}

export const NishioTweetList = forwardRef<HTMLDivElement, NishioTweetListProps>(
  ({ events, visibleTweetIndex, tweetRefs }, ref) => {
    return (
      <div className="flex-1 relative">
        <div
          ref={ref}
          className="space-y-4 max-h-[28rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {events.map((event, index) => (
            <div
              key={index}
              ref={(el) => {
                if (tweetRefs.current) {
                  tweetRefs.current[index] = el;
                }
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
    );
  },
);

NishioTweetList.displayName = "NishioTweetList";
