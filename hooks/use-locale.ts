"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function useLocale() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<string>("zh");

  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam && ["ja", "zh"].includes(langParam)) {
      setLocale(langParam);
    } else {
      // 默认使用日语
      setLocale("zh");
    }
    // 设置语言到 html tag 上
    document.documentElement.setAttribute("lang", locale);
  }, [searchParams, locale]);

  return locale;
}
