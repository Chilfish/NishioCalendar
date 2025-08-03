"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEventStore } from "@/stores/eventStore";

export function NishioCalendarInteractive() {
  const { events, visibleTweetIndex, syncCalendarFromScroll } = useEventStore();
  const tweetsContainerRef = useRef<HTMLDivElement>(null);
  const tweetRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 处理推文滚动，同步日历
  const handleTweetScroll = useCallback(() => {
    if (!tweetsContainerRef.current) return;

    const container = tweetsContainerRef.current;

    // 找到当前可见的推文
    let currentIndex = 0;
    for (let i = 0; i < tweetRefs.current.length; i++) {
      const tweetElement = tweetRefs.current[i];
      if (tweetElement) {
        const rect = tweetElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (rect.top <= containerRect.top + containerRect.height / 2) {
          currentIndex = i;
        } else {
          break;
        }
      }
    }

    if (currentIndex !== visibleTweetIndex) {
      // 使用 Zustand 的复合动作来同步状态
      syncCalendarFromScroll(currentIndex);
    }
  }, [visibleTweetIndex, syncCalendarFromScroll]);

  // 注水时绑定到已存在的 DOM 元素
  useEffect(() => {
    const container = document.querySelector(
      "ul#tweets-container",
    ) as HTMLDivElement;
    const tweetElements = document.querySelectorAll(
      "ul#tweets-container li",
    ) as NodeListOf<HTMLDivElement>;

    if (container) {
      tweetsContainerRef.current = container;
      container.addEventListener("scroll", handleTweetScroll);
    }

    if (tweetElements.length > 0) {
      tweetRefs.current = Array.from(tweetElements);
    }

  }, [events]); // 依赖 events 确保在数据加载后绑定

  return null; // 这个组件不渲染任何内容，只处理交互逻辑
}
