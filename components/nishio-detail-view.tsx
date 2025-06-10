"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NishioTweetCard } from "./nishio-tweet-card"
import { CalendarIcon, List, Twitter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { NishioEvent } from "@/lib/types"
import { getNishioEvents } from "@/lib/data"

export function NishioDetailView() {
  const [events, setEvents] = useState<NishioEvent[]>([])
  const [activeTab, setActiveTab] = useState("calendar")

  useEffect(() => {
    const fetchedEvents = getNishioEvents()
    setEvents(fetchedEvents)
  }, [])

  return (
    <Card className="border border-gray-200 shadow-sm mt-6">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            西尾历详情
          </CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="calendar" className="flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                日历
              </TabsTrigger>
              <TabsTrigger value="tweets" className="flex items-center gap-1">
                <Twitter className="w-3.5 h-3.5" />
                推文
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === "calendar" ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  西尾历是一种特殊的历法，每个月的最后一天被称为该月的第32天。以下是所有已知的西尾日：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span>{new Date(event.realDate).toLocaleDateString()}</span>
                      </div>
                      <span className="font-medium text-primary">{event.nishioDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tweets"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">西尾日推文</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <List className="w-3.5 h-3.5" />
                  <span>共 {events.length} 条</span>
                </div>
              </div>
              <div className="space-y-4">
                {events.slice(0, 3).map((event, index) => (
                  <NishioTweetCard key={index} event={event} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
