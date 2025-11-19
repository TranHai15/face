/**
 * Mock API service để giả lập API calls khi backend chưa sẵn sàng
 * Chỉ sử dụng trong development/testing
 */

/**
 * @typedef {Object} Visitor
 * @property {string} id
 * @property {string} fullName
 * @property {string} cccd
 * @property {string} organization
 * @property {string} faceImage
 * @property {Date} checkInTime
 */

// Mock data
let mockVisitors = [
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

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockVisitorApi = {
  /**
   * Lấy danh sách tất cả visitors
   */
  getAll: async () => {
    await delay(500);
    return {
      data: [...mockVisitors],
      total: mockVisitors.length,
    };
  },

  /**
   * Lấy visitor theo ID
   */
  getById: async (id) => {
    await delay(300);
    const visitor = mockVisitors.find((v) => v.id === id);
    if (!visitor) {
      throw new Error("Visitor not found");
    }
    return visitor;
  },

  /**
   * Tạo visitor mới
   */
  create: async (visitorData) => {
    await delay(400);
    const newVisitor = {
      id: Date.now().toString(),
      ...visitorData,
      checkInTime: new Date(),
    };
    mockVisitors.unshift(newVisitor);
    return newVisitor;
  },

  /**
   * Cập nhật visitor
   */
  update: async (id, visitorData) => {
    await delay(400);
    const index = mockVisitors.findIndex((v) => v.id === id);
    if (index === -1) {
      throw new Error("Visitor not found");
    }
    mockVisitors[index] = { ...mockVisitors[index], ...visitorData };
    return mockVisitors[index];
  },

  /**
   * Xóa visitor
   */
  delete: async (id) => {
    await delay(300);
    const index = mockVisitors.findIndex((v) => v.id === id);
    if (index === -1) {
      throw new Error("Visitor not found");
    }
    mockVisitors.splice(index, 1);
  },

  /**
   * Lấy visitors mới nhất
   */
  getRecent: async (limit = 10) => {
    await delay(300);
    return mockVisitors.slice(0, limit);
  },
};

