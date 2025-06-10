import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Repeat, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { NishioEvent } from "@/lib/types";

interface NishioTweetCardProps {
  event: NishioEvent;
}

export function NishioTweetCard({ event }: NishioTweetCardProps) {
  const handleViewTweet = () => {
    window.open(event.tweetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden gap-2 py-2 border border-gray-200/80 shadow-sm bg-card backdrop-blur-sm">
        <CardContent className="p-3 pb-0">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-primary/10 transition-all">
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
                    {format(event.realDate, "yyyy年M月d日 HH:mm", {
                      locale: zhCN,
                    })}
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
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors group/btn">
              <div className="rounded-full group-hover/btn:bg-blue-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">{event.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors group/btn">
              <div className="rounded-full group-hover/btn:bg-green-50 transition-colors">
                <Repeat className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">{event.retweets}</span>
            </button>
            <button
              className={`flex items-center gap-1 transition-colors group/btn`}
            >
              <div className="rounded-full group-hover/btn:bg-red-50 transition-colors text-red-500">
                <Heart className={`w-4 h-4 fill-current`} />
              </div>
              <span className="text-xs font-medium">{event.likes}</span>
            </button>
          </div>
          <button
            onClick={handleViewTweet}
            className="flex items-center gap-1 px-3 py-1.5 text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-full transition-all text-xs font-medium border border-primary/20 hover:border-primary/30"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
