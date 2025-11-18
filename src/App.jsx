import { useState, useEffect } from "react";
import { WelcomeDisplay } from "./components/WelcomeDisplay";
import { VisitorsList } from "./components/VisitorsList";

/**
 * @typedef {Object} Visitor
 * @property {string} id
 * @property {string} fullName
 * @property {string} cccd
 * @property {string} organization
 * @property {string} faceImage
 * @property {Date} checkInTime
 */

// Mock data cho demo
const mockVisitors = [
  {
    id: "1",
    fullName: "Nguyễn Văn An",
    cccd: "001234567890",
    organization: "Công ty TNHH ABC",
    faceImage: "https://i.pravatar.cc/150?img=12",
    checkInTime: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    fullName: "Trần Thị Bình",
    cccd: "001234567891",
    organization: "Tập đoàn XYZ",
    faceImage: "https://i.pravatar.cc/150?img=5",
    checkInTime: new Date(Date.now() - 180000),
  },
  {
    id: "3",
    fullName: "Lê Hoàng Cường",
    cccd: "001234567892",
    organization: "Sở Kế hoạch và Đầu tư",
    faceImage: "https://i.pravatar.cc/150?img=33",
    checkInTime: new Date(Date.now() - 120000),
  },
];

const newVisitorQueue = [
  {
    id: "4",
    fullName: "Phạm Minh Đức",
    cccd: "001234567893",
    organization: "Viện Nghiên cứu Công nghệ",
    faceImage: "https://i.pravatar.cc/150?img=15",
    checkInTime: new Date(),
  },
  {
    id: "5",
    fullName: "Hoàng Thu Hà",
    cccd: "001234567894",
    organization: "Ngân hàng Vietcombank",
    faceImage: "https://i.pravatar.cc/150?img=9",
    checkInTime: new Date(),
  },
  {
    id: "6",
    fullName: "Đỗ Quang Huy",
    cccd: "001234567895",
    organization: "Bộ Thông tin và Truyền thông",
    faceImage: "https://i.pravatar.cc/150?img=68",
    checkInTime: new Date(),
  },
];

export default function App() {
  const [currentVisitor, setCurrentVisitor] = useState(null);
  const [visitorsList, setVisitorsList] = useState(mockVisitors);
  const [queueIndex, setQueueIndex] = useState(0);

  // Simulate camera AI detecting new visitors
  useEffect(() => {
    const interval = setInterval(() => {
      if (queueIndex < newVisitorQueue.length) {
        const newVisitor = {
          ...newVisitorQueue[queueIndex],
          checkInTime: new Date(),
        };

        // Show welcome screen for new visitor
        setCurrentVisitor(newVisitor);

        // Add to visitors list
        setVisitorsList((prev) => [newVisitor, ...prev]);

        setQueueIndex((prev) => prev + 1);

        // Clear current visitor after 5 seconds
        setTimeout(() => {
          setCurrentVisitor(null);
        }, 5000);
      }
    }, 8000); // New visitor every 8 seconds

    return () => clearInterval(interval);
  }, [queueIndex]);

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
              AI Face Recognition System
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
              <VisitorsList visitors={visitorsList} />
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
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <span>Camera AI đang hoạt động</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
