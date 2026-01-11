'use client'

import type { NishioEvent } from '@/lib/types'
import { format } from 'date-fns'
import { ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TweetText } from './TweetText'

interface NishioTweetCardProps {
  event: NishioEvent
}

export function NishioTweetCard({ event }: NishioTweetCardProps) {
  return (
    <Card className="overflow-hidden gap-2 py-2 border border-gray-200/80 shadow-sm bg-card backdrop-blur-sm">
      <CardContent className="p-3 pb-0">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="size-8 ring-2 ring-primary/10 transition-all">
              <AvatarImage src="/avatar.jpg" alt="@240y_k" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-medium">
                西尾
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">
                    西尾夕香
                  </span>
                  <span className="text-gray-500 text-sm">@240y_k</span>
                </div>
                <div className="text-xs text-gray-400">
                  {format(event.realDate, 'yyyy年M月d日 HH:mm')}
                </div>
              </div>

              <Button
                variant="ghost"
                render={(
                  <a
                    href={event.tweetUrl}
                    target="_blank"
                  />
                )}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>
            <TweetText text={event.tweetText} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
