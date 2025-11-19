import { useEffect, useRef } from "react";
import { WelcomeDisplay } from "./components/WelcomeDisplay";
import { VisitorsList } from "./components/VisitorsList";
import { useVisitors } from "./hooks/useVisitors";
import { useSignalR } from "./hooks/useSignalR";
import { useVisitorStore } from "./store/visitorStore";
import { env } from "./config/env";

// Mock visitor data pool để tự động thêm khách
// const MOCK_VISITORS = [
//   {
//     fullName: "Nguyễn Văn An",
//     cccd: "001234567890",
//     organization: "Công ty TNHH ABC",
//     faceImage: "https://i.pravatar.cc/150?img=12",
//   },
//   {
//     fullName: "Trần Thị Bình",
//     cccd: "001234567891",
//     organization: "Tập đoàn XYZ",
//     faceImage: "https://i.pravatar.cc/150?img=5",
//   },
//   {
//     fullName: "Lê Hoàng Cường",
//     cccd: "001234567892",
//     organization: "Sở Kế hoạch và Đầu tư",
//     faceImage: "https://i.pravatar.cc/150?img=33",
//   },
//   {
//     fullName: "Phạm Thị Dung",
//     cccd: "001234567893",
//     organization: "Bộ Công Thương",
//     faceImage: "https://i.pravatar.cc/150?img=47",
//   },
//   {
//     fullName: "Hoàng Văn Em",
//     cccd: "001234567894",
//     organization: "Ngân hàng Nhà nước",
//     faceImage: "https://i.pravatar.cc/150?img=68",
//   },
//   {
//     fullName: "Võ Thị Phương",
//     cccd: "001234567895",
//     organization: "Công ty Cổ phần DEF",
//     faceImage: "https://i.pravatar.cc/150?img=15",
//   },
//   {
//     fullName: "Đỗ Minh Quang",
//     cccd: "001234567896",
//     organization: "Tổng Công ty GHI",
//     faceImage: "https://i.pravatar.cc/150?img=20",
//   },
//   {
//     fullName: "Bùi Thị Lan",
//     cccd: "001234567897",
//     organization: "Công ty TNHH JKL",
//     faceImage: "https://i.pravatar.cc/150?img=25",
//   },
// ];

export default function App() {
  // Sử dụng custom hooks để quản lý state
  const { visitors, currentVisitor, isLoading, error } = useVisitors();
  // Kết nối SignalR để nhận real-time updates
  const { isConnected, connectionState } = useSignalR();
  console.log("🚀 ~ App ~ isConnected:", isConnected);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/95 text-white shadow-md border-b shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3 lg:px-6 lg:py-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white">
              Hệ Thống Nhận Diện Khách
            </h1>
            <p className="text-xs lg:text-sm text-white/85 font-medium">
              {env.APP_NAME}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-hidden flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-3 py-4 lg:px-4 lg:py-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
            {/* Welcome Display - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <WelcomeDisplay visitor={currentVisitor} />
            </div>

            {/* Visitors List - Takes 1/3 of the space */}
            <div className="lg:col-span-1">
              <VisitorsList visitors={visitors} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-2 lg:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5 text-xs text-muted-foreground">
            <div>© 2025 AI Face Recognition System</div>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              ></div>
              <span>
                {isConnected ? "Camera AI đang hoạt động" : "Đang kết nối..."}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
