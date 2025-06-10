import type { NishioEvent } from "./types"

// Generate mock data for Nishio Calendar events
export function getNishioEvents(): NishioEvent[] {
  const events: NishioEvent[] = [
    // 每月第一天作为上个月32日的西尾日
    {
      realDate: new Date(2024, 10, 1), // November 1, 2024
      nishioDate: "10月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567898",
      tweetText: "11月1日，但这是10月32日！西尾历的神奇之处～",
    },
    {
      realDate: new Date(2024, 9, 1), // October 1, 2024
      nishioDate: "9月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567899",
      tweetText: "10月的开始，却是9月32日！时间在这里有了新的意义",
    },
    {
      realDate: new Date(2024, 8, 1), // September 1, 2024
      nishioDate: "8月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567900",
      tweetText: "9月第一天，但在西尾历中这是8月32日！",
    },
    {
      realDate: new Date(2024, 7, 1), // August 1, 2024
      nishioDate: "7月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567901",
      tweetText: "8月开始了，但西尾历说这还是7月32日！",
    },
    {
      realDate: new Date(2024, 6, 1), // July 1, 2024
      nishioDate: "6月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567902",
      tweetText: "7月1日？不，这是6月32日！西尾历的魅力所在",
    },
    {
      realDate: new Date(2024, 5, 1), // June 1, 2024
      nishioDate: "5月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567903",
      tweetText: "6月的第一天，在西尾历中是5月32日！",
    },
    {
      realDate: new Date(2024, 4, 1), // May 1, 2024
      nishioDate: "4月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567904",
      tweetText: "劳动节快乐！今天是4月32日～",
    },
    {
      realDate: new Date(2024, 3, 1), // April 1, 2024
      nishioDate: "3月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567905",
      tweetText: "愚人节，但3月32日可不是玩笑！",
    },
    {
      realDate: new Date(2024, 2, 1), // March 1, 2024
      nishioDate: "2月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567906",
      tweetText: "3月来了，但先过个2月32日！",
    },
    {
      realDate: new Date(2024, 1, 1), // February 1, 2024
      nishioDate: "1月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567907",
      tweetText: "2月第一天，西尾历的1月32日！",
    },
    {
      realDate: new Date(2024, 0, 1), // January 1, 2024
      nishioDate: "12月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567908",
      tweetText: "新年快乐！但在西尾历中，这还是去年12月32日！🎊",
    },

  ]

  return events.sort((a, b) => b.realDate.getTime() - a.realDate.getTime())
}
