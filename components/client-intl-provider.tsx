"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "@/hooks/use-locale";
import { useState, useEffect } from "react";
import { LoaderIcon } from "lucide-react";

interface ClientIntlProviderProps {
  children: React.ReactNode;
}

export function ClientIntlProvider({ children }: ClientIntlProviderProps) {
  const locale = useLocale();
  const [messages, setMessages] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messageModule = await import(`../locale/${locale}.json`);
        setMessages(messageModule.default);
      } catch (error) {
        console.error("Failed to load messages:", error);
        // 回退到中文
        const fallbackModule = await import(`../locale/zh.json`);
        setMessages(fallbackModule.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [locale]);

  if (isLoading || !messages) {
    return (
      <div className="flex items-center justify-center gap-4 h-screen py-auto">
        <LoaderIcon className="animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
