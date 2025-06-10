"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Repeat, Share } from "lucide-react"
import { motion } from "framer-motion"
import type { NishioEvent } from "@/lib/types"

interface NishioTweetCardProps {
  event: NishioEvent
}

export function NishioTweetCard({ event }: NishioTweetCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="https://picsum.photos/200?random=avatar" alt="@240y_k" />
              <AvatarFallback>西尾</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">西尾夕香</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">@240y_k</span>
                </div>
                <Badge className="bg-[#EE7744]">{event.nishioDate}</Badge>
              </div>
              <p className="text-base">{event.tweetText}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">42</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
            <Repeat className="w-4 h-4" />
            <span className="text-xs">12</span>
          </button>
          <button
            className={`flex items-center space-x-1 ${liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs">{liked ? "124" : "123"}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <Share className="w-4 h-4" />
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
