import type { NishioEvent } from "../lib/types";
import { getNishioDateDisplay } from "../lib/nishio-calendar-utils";
import { readFile, writeFile } from "node:fs/promises";

type Tweet = {
  id: number;
  tweet_id: string;
  user_name: string;
  created_at: string;
  full_text: string;
  media: string[];
  retweet_count: number;
  quote_count: number;
  reply_count: number;
  favorite_count: number;
  views_count: number;
  retweeted_status: null;
  quoted_status: null;
};

const nishioDayMatch = ["２８日", "２９日", "３０日", "３１日", "３２日"];

const inputFilePath = process.argv[2];

const data: Tweet[] = JSON.parse(await readFile(inputFilePath, "utf8"));

const events: NishioEvent[] = data
  .map((tweet) => {
    const isNishioTweet = nishioDayMatch.some((day) =>
      tweet.full_text.includes(day),
    );
    if (!isNishioTweet) return null;
    const date = new Date(tweet.created_at);
    const url = `https://twitter.com/${tweet.user_name}/status/${tweet.tweet_id}`;
    return {
      tweetText: tweet.full_text,
      realDate: new Date(date),
      nishioDate: getNishioDateDisplay(date) || "",
      tweetUrl: url,
      likes: tweet.favorite_count,
      retweets: tweet.retweet_count,
      comments: tweet.reply_count,
    } satisfies NishioEvent;
  })
  .filter((tweet) => tweet !== null);

console.log(events.length);

await writeFile("nishio-events.json", JSON.stringify(events, null, 2));
