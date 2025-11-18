import { motion, AnimatePresence } from "motion/react";
import { Users, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

/**
 * @typedef {Object} Visitor
 * @property {string} id
 * @property {string} fullName
 * @property {string} cccd
 * @property {string} organization
 * @property {string} faceImage
 * @property {Date} checkInTime
 */

/**
 * @param {Object} props
 * @param {Visitor[]} props.visitors
 */
export function VisitorsList({ visitors }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="h-[80vh] max-h-[80vh] min-h-[400px] flex flex-col overflow-hidden shadow-xl border">
      {/* Header - Fixed */}
      <CardHeader className="bg-gradient-to-r from-primary to-primary/95 text-white border-0 shrink-0 px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-white/20 rounded-md shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <CardTitle className="text-base font-bold text-white">
            Khách đã đến
          </CardTitle>
        </div>
        <CardDescription className="text-white/90 text-xs">
          Tổng số:{" "}
          <span className="text-base font-bold text-white">
            {visitors.length}
          </span>{" "}
          khách
        </CardDescription>
      </CardHeader>

      {/* Scrollable List Container */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth bg-background">
          <div className="p-3 space-y-2">
            <AnimatePresence initial={false}>
              {visitors.map((visitor, index) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                    delay: index < 3 ? index * 0.03 : 0,
                  }}
                  className="shrink-0"
                >
                  <Card className="bg-card shadow-sm hover:shadow-md transition-all duration-200 border hover:border-primary/50 relative group">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        {/* Face Image */}
                        <div className="shrink-0">
                          <Avatar className="w-12 h-12 lg:w-14 lg:h-14 border border-border shadow-sm ring-1 ring-ring/10 group-hover:ring-primary/30 transition-all">
                            <AvatarImage
                              src={visitor.faceImage}
                              alt={visitor.fullName}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-primary/10">
                              <Users className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-foreground mb-1 truncate font-bold text-sm">
                            {visitor.fullName}
                          </h3>
                          <div className="space-y-0.5">
                            <p className="text-xs text-foreground">
                              <span className="text-muted-foreground font-medium">
                                CCCD:
                              </span>{" "}
                              <span className="font-mono font-semibold text-foreground">
                                {visitor.cccd}
                              </span>
                            </p>
                            <p className="text-xs text-foreground break-words line-clamp-2">
                              <span className="text-muted-foreground font-medium">
                                Cơ quan:
                              </span>{" "}
                              <span className="font-medium">
                                {visitor.organization}
                              </span>
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-primary mt-1">
                              <Clock className="w-3 h-3 shrink-0" />
                              <span className="font-mono font-bold">
                                {formatTime(visitor.checkInTime)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* New Badge */}
                      {index === 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="absolute top-2 right-2"
                        >
                          <Badge
                            variant="default"
                            className="shadow-md text-[10px] font-bold px-1.5 py-0.5"
                          >
                            Mới
                          </Badge>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {visitors.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <div className="p-3 bg-muted rounded-full mb-3">
                  <Users className="w-10 h-10 opacity-50" />
                </div>
                <p className="text-sm font-medium">Chưa có khách đến</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="bg-muted/50 p-2 border-t shrink-0">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          <span className="font-medium">Cập nhật thời gian thực</span>
        </div>
      </div>
    </Card>
  );
}
