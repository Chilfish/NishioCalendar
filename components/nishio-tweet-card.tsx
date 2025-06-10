"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Repeat, ExternalLink, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { NishioEvent } from "@/lib/types"

interface NishioTweetCardProps {
  event: NishioEvent
}

export function NishioTweetCard({ event }: NishioTweetCardProps) {
  const [liked, setLiked] = useState(false)

  const handleViewTweet = () => {
    window.open(event.tweetUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden border border-gray-200/80 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md bg-white/70 backdrop-blur-sm">
        <CardContent className="p-5">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all">
                <AvatarImage src="https://picsum.photos/200?random=avatar" alt="@240y_k" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-medium">
                  西
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Twitter className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">西尾夕香</span>
                    <span className="text-gray-500 text-sm">@240y_k</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {format(event.realDate, "yyyy年M月d日 HH:mm", { locale: zhCN })}
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-sm">
                  {event.nishioDate}
                </Badge>
              </div>
              <p className="text-gray-800 leading-relaxed text-sm">{event.tweetText}</p>
              {event.imageUrl && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                  <img 
                    src={event.imageUrl} 
                    alt="推文图片" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-5 py-3 border-t border-gray-100/80 flex justify-between items-center bg-gray-50/50">
          <div className="flex space-x-6">
            <button className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-500 transition-colors group/btn">
              <div className="p-1.5 rounded-full group-hover/btn:bg-blue-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">42</span>
            </button>
            <button className="flex items-center space-x-1.5 text-gray-500 hover:text-green-500 transition-colors group/btn">
              <div className="p-1.5 rounded-full group-hover/btn:bg-green-50 transition-colors">
                <Repeat className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">12</span>
            </button>
            <button
              className={`flex items-center space-x-1.5 transition-colors group/btn ${
                liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              }`}
              onClick={() => setLiked(!liked)}
            >
              <div className="p-1.5 rounded-full group-hover/btn:bg-red-50 transition-colors">
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              </div>
              <span className="text-xs font-medium">{liked ? "124" : "123"}</span>
            </button>
          </div>
          <button
            onClick={handleViewTweet}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-full transition-all text-xs font-medium border border-primary/20 hover:border-primary/30"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>查看推文</span>
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
