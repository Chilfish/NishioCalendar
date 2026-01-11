'use client'

import { NishioTweetCard } from '@/components/nishio-tweet-card'
import { useEventStore } from '@/stores/eventStore'

export function NishioTweetList() {
  const { events } = useEventStore()

  return (
    <div className="flex-1 relative lg:max-w-120">
      <ul
        id="tweets-container"
        className="space-y-2 max-h-[28rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {events.map((event, index) => (
          <li key={index} className="transition-all duration-300 rounded-xl">
            <NishioTweetCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  )
}
