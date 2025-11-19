import axiosClient from "./axiosClient";
import { mockVisitorApi } from "./mockVisitorApi";

// Flag để switch giữa real API và mock API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true" || false;

/**
 * API endpoints cho Visitor management
 * Sử dụng mock API nếu USE_MOCK_API = true
 */
export const visitorApi = {
  /**
   * Lấy danh sách tất cả visitors
   * @returns {Promise<{data: Visitor[], total: number}>}
   */
  getAll: async () => {
    // if (USE_MOCK_API) {
    //   return await mockVisitorApi.getAll();
    // }

    try {
      const response = await axiosClient.get("/Customers");
      console.log("🚀 ~ response:", response);
      return {
        data:
          response.data?.map((item) => ({
            ...item,
            checkInTime: new Date(item.checkInTime),
          })) || [],
        total: response.total || 0,
      };
    } catch (error) {
      console.error("Error fetching visitors:", error);
      throw error;
    }
  },

  /**
   * Lấy visitor theo ID
   * @param {string} id
   * @returns {Promise<Visitor>}
   */
  getById: async (id) => {
    if (USE_MOCK_API) {
      return await mockVisitorApi.getById(id);
    }

    try {
      const response = await axiosClient.get(`/visitors/${id}`);
      return {
        ...response.data,
        checkInTime: new Date(response.data.checkInTime),
      };
    } catch (error) {
      console.error("Error fetching visitor:", error);
      throw error;
    }
  },

  /**
   * Tạo visitor mới
   * @param {Object} visitorData
   * @returns {Promise<Visitor>}
   */
  create: async (visitorData) => {
    if (USE_MOCK_API) {
      return await mockVisitorApi.create(visitorData);
    }

    try {
      const response = await axiosClient.post("/visitors", visitorData);
      return {
        ...response.data,
        checkInTime: new Date(response.data.checkInTime),
      };
    } catch (error) {
      console.error("Error creating visitor:", error);
      throw error;
    }
  },

  /**
   * Cập nhật visitor
   * @param {string} id
   * @param {Object} visitorData
   * @returns {Promise<Visitor>}
   */
  update: async (id, visitorData) => {
    if (USE_MOCK_API) {
      return await mockVisitorApi.update(id, visitorData);
    }

    try {
      const response = await axiosClient.put(`/visitors/${id}`, visitorData);
      return {
        ...response.data,
        checkInTime: new Date(response.data.checkInTime),
      };
    } catch (error) {
      console.error("Error updating visitor:", error);
      throw error;
    }
  },

  /**
   * Xóa visitor
   * @param {string} id
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    if (USE_MOCK_API) {
      return await mockVisitorApi.delete(id);
    }

    try {
      await axiosClient.delete(`/visitors/${id}`);
    } catch (error) {
      console.error("Error deleting visitor:", error);
      throw error;
    }
  },

  /**
   * Lấy visitors mới nhất
   * @param {number} limit
   * @returns {Promise<Visitor[]>}
   */
  getRecent: async (limit = 10) => {
    if (USE_MOCK_API) {
      return await mockVisitorApi.getRecent(limit);
    }

    try {
      const response = await axiosClient.get(`/visitors/recent?limit=${limit}`);
      return (
        response.data?.map((item) => ({
          ...item,
          checkInTime: new Date(item.checkInTime),
        })) || []
      );
    } catch (error) {
      console.error("Error fetching recent visitors:", error);
      throw error;
    }
  },
};
