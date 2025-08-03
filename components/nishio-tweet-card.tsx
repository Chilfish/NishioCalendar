"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Repeat, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import type { NishioEvent } from "@/lib/types";

interface NishioTweetCardProps {
  event: NishioEvent;
}

export function NishioTweetCard({ event }: NishioTweetCardProps) {
  const handleViewTweet = () => {
    window.open(event.tweetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="overflow-hidden gap-2 py-2 border border-gray-200/80 shadow-sm bg-card backdrop-blur-sm">
      <CardContent className="p-3 pb-0">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-primary/10 transition-all">
              <AvatarImage src="/avatar.jpg" alt="@240y_k" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-medium">
                西尾
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">
                    西尾夕香
                  </span>
                  <span className="text-gray-500 text-sm">@240y_k</span>
                </div>
                <div className="text-xs text-gray-400">
                  {format(event.realDate, "yyyy年M月d日 HH:mm")}
                </div>
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed text-sm">
              {event.tweetText}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pt-3! pb-2 border-t border-gray-100/80 flex justify-between items-center bg-gray-50/50">
        <div className="flex gap-6">
          <Button
            variant="ghost"
          className="flex items-center gap-1 text-gray-500 transition-colors">
            <div className="rounded-full text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">{event.comments}</span>
          </Button>
          <Button
            variant="ghost" className="flex items-center gap-1 text-gray-500 transition-colors">
            <div className="rounded-full text-green-500 transition-colors">
              <Repeat className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">{event.retweets}</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center gap-1 transition-colors`}
          >
            <div className="rounded-full transition-colors text-red-500">
              <Heart className={`w-4 h-4 fill-current`} />
            </div>
            <span className="text-xs font-medium">{event.likes}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewTweet}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
