import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, CreditCard, Building2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
 * @param {Visitor | null} props.visitor
 */
export function WelcomeDisplay({ visitor }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] max-h-[80vh] min-h-[400px]">
      <AnimatePresence mode="wait">
        {visitor ? (
          <motion.div
            key={visitor.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Card className="h-full bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground border-0 shadow-xl relative overflow-hidden">
              <CardContent className="h-full flex flex-col items-center justify-center p-4 lg:p-6 relative z-10">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="relative z-10 mb-4"
                >
                  <Avatar className="w-20 h-20 lg:w-28 lg:h-28 border-3 border-white/30 shadow-lg ring-2 ring-white/20">
                    <AvatarImage
                      src={visitor.faceImage}
                      alt={visitor.fullName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-white/20">
                      <User className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                {/* Greeting & Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center relative z-10 mb-5"
                >
                  <h2 className="text-2xl lg:text-3xl mb-1.5 font-bold text-white drop-shadow-md">
                    Xin Chào!
                  </h2>
                  <p className="text-xl lg:text-2xl font-bold text-white drop-shadow-sm">
                    {visitor.fullName}
                  </p>
                </motion.div>

                {/* Info Cards - Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl relative z-10"
                >
                  <Card className="bg-white/95 backdrop-blur-sm border-white/30 shadow-md">
                    <CardHeader className="pb-2 px-3 pt-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary shrink-0" />
                        <CardTitle className="text-xs font-semibold text-foreground">
                          CCCD
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-3 pb-3">
                      <p className="text-sm font-bold text-foreground break-all font-mono">
                        {visitor.cccd}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/95 backdrop-blur-sm border-white/30 shadow-md">
                    <CardHeader className="pb-2 px-3 pt-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary shrink-0" />
                        <CardTitle className="text-xs font-semibold text-foreground">
                          Cơ quan
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-3 pb-3">
                      <p className="text-sm font-bold text-foreground break-words leading-tight">
                        {visitor.organization}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-center relative z-10"
                >
                  <p className="text-xs lg:text-sm text-white/90 font-medium px-4">
                    Chúc quý khách có một ngày làm việc hiệu quả!
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="standby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Card className="h-full bg-gradient-to-br from-muted to-muted/80 border-2 border-dashed border-border shadow-lg relative overflow-hidden">
              <CardContent className="h-full flex flex-col items-center justify-center p-4 lg:p-6 relative z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4 relative z-10"
                >
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Avatar className="w-16 h-16 lg:w-20 lg:h-20 bg-primary/5 border-2 border-primary/20">
                      <AvatarFallback>
                        <User className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </motion.div>

                <h3 className="text-xl lg:text-2xl text-foreground mb-2 font-bold text-center px-4">
                  Đang chờ khách hàng
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4 text-center px-4 max-w-sm">
                  Vui lòng đứng trước camera để hệ thống nhận diện
                </p>

                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <motion.span
                    key={currentTime}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-base lg:text-lg font-mono font-bold text-foreground"
                  >
                    {currentTime}
                  </motion.span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
