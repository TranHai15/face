import { useEffect, useRef } from "react";
import { signalRService, SignalREvents } from "../socket/signalRService";
import { useVisitorStore } from "../store/visitorStore";
import { env } from "../config/env";

/**
 * Custom hook để quản lý SignalR connection và xử lý events
 * 
 * Chức năng:
 * - Gọi kết nối SignalR khi component mount
 * - Lắng nghe các events từ SignalR
 * - Xử lý events và gọi store để cập nhật dữ liệu
 * - Quản lý lifecycle của connection
 */
export function useSignalR() {
  const {
    addVisitor,
    setCurrentVisitor,
    clearCurrentVisitor,
  } = useVisitorStore();
  const isInitialized = useRef(false);

  useEffect(() => {
    // Chỉ khởi tạo một lần
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Kết nối SignalR
    signalRService.connect();

    // Đăng ký event handler: Visitor Detected - Khi AI phát hiện visitor mới
    signalRService.on(SignalREvents.VISITOR_DETECTED, (visitor) => {
      console.log("Visitor detected:", visitor);
      
      // Xử lý dữ liệu visitor
      const visitorData = {
        ...visitor,
        checkInTime: new Date(visitor.checkInTime),
      };

      // Thêm vào danh sách visitors trong store
      addVisitor(visitorData);

      // Hiển thị welcome screen với visitor mới
      setCurrentVisitor(visitorData);

      // Tự động ẩn welcome screen sau một khoảng thời gian
      const duration = env.WELCOME_DISPLAY_DURATION;
      setTimeout(() => {
        clearCurrentVisitor();
      }, duration);
    });

    // Cleanup khi component unmount
    return () => {
      signalRService.off(SignalREvents.VISITOR_DETECTED);
    };
  }, [addVisitor, setCurrentVisitor, clearCurrentVisitor]);

  return {
    isConnected: signalRService.isConnected,
    connectionState: signalRService.getConnectionState(),
    reconnect: () => signalRService.connect(),
    disconnect: () => signalRService.disconnect(),
  };
}
