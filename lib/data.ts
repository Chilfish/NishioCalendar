import type { NishioEvent } from "./types"

// Generate mock data for Nishio Calendar events
export function getNishioEvents(): NishioEvent[] {
  const events: NishioEvent[] = [
    {
      realDate: new Date(2024, 9, 31), // October 31, 2024
      nishioDate: "10月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567894",
      tweetText: "10月32日！ 🎃 万圣节也是西尾日！",
      imageUrl: `https://picsum.photos/400/300?random=5`,
    },
    {
      realDate: new Date(2024, 8, 30), // September 30, 2024
      nishioDate: "9月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567896",
      tweetText: "9月32日！秋天来了～",
    },
    {
      realDate: new Date(2024, 7, 31), // August 31, 2024
      nishioDate: "8月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567892",
      tweetText: "8月32日！暑假的结束也是新开始的标志",
      imageUrl: `https://picsum.photos/400/300?random=3`,
    },
    {
      realDate: new Date(2024, 6, 31), // July 31, 2024
      nishioDate: "7月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567899",
      tweetText: "7月32日！夏天真热啊！",
      imageUrl: `https://picsum.photos/400/300?random=10`,
    },
    {
      realDate: new Date(2024, 5, 30), // June 30, 2024
      nishioDate: "6月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567891",
      tweetText: "6月32日！夏天的最后一天变成了特殊的一天～",
      imageUrl: `https://picsum.photos/400/300?random=2`,
    },
    {
      realDate: new Date(2024, 4, 31), // May 31, 2024
      nishioDate: "5月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567893",
      tweetText: "5月32日！春天的尾巴～",
      imageUrl: `https://picsum.photos/400/300?random=4`,
    },
    {
      realDate: new Date(2024, 3, 30), // April 30, 2024
      nishioDate: "4月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567895",
      tweetText: "4月32日！春天真美好",
    },
    {
      realDate: new Date(2024, 2, 31), // March 31, 2024 - 生日
      nishioDate: "3月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567895",
      tweetText: "3月32日！今天是我的生日，也是西尾历的特殊起点！🎂",
      imageUrl: `https://picsum.photos/400/300?random=6`,
    },
    {
      realDate: new Date(2024, 1, 29), // February 29, 2024 (leap year)
      nishioDate: "2月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567897",
      tweetText: "2月32日！闰年的特殊西尾日！",
    },
    {
      realDate: new Date(2024, 0, 31), // January 31, 2024
      nishioDate: "1月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567897",
      tweetText: "はっ 1月32日 新年的第一个西尾日！",
      imageUrl: `https://picsum.photos/400/300?random=8`,
    },
    {
      realDate: new Date(2023, 11, 31), // December 31, 2023
      nishioDate: "12月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567890",
      tweetText: "🎍 1 2 月 3 2 日 🎍",
      imageUrl: `https://picsum.photos/400/300?random=1`,
    },
    {
      realDate: new Date(2023, 10, 30), // November 30, 2023
      nishioDate: "11月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567891",
      tweetText: "11月32日！秋天的最后一天",
    },
    {
      realDate: new Date(2023, 9, 31), // October 31, 2023
      nishioDate: "10月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567892",
      tweetText: "10月32日！去年的万圣节西尾日",
      imageUrl: `https://picsum.photos/400/300?random=11`,
    },
    {
      realDate: new Date(2023, 8, 30), // September 30, 2023
      nishioDate: "9月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567893",
      tweetText: "9月32日！秋天来了～",
    },
    {
      realDate: new Date(2023, 7, 31), // August 31, 2023
      nishioDate: "8月32日",
      tweetUrl: "https://twitter.com/240y_k/status/1234567894",
      tweetText: "8月32日！夏天的结束",
      imageUrl: `https://picsum.photos/400/300?random=12`,
    },
  ]

  return events.sort((a, b) => b.realDate.getTime() - a.realDate.getTime())
}
