import type { NishioEvent } from "./types"
import { generateNishioEvent } from "./nishio-calendar-utils"

export function getNishioEvents(): NishioEvent[] {
  const events: NishioEvent[] = [
    generateNishioEvent({
      realDate: new Date(2024, 11, 1),
      tweetText:  "12月1日，但这是11月31日！西尾历的神奇之处～",
      tweetUrl: "https://twitter.com/240y_k/status/1234567897",
      retweets: 233,
      likes: 233,
      comments: 123,
    }),
  ]

  return events.sort((a, b) => b.realDate.getTime() - a.realDate.getTime())
}
