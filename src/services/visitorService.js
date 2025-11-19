import { visitorApi } from "../api/visitorApi";
import { useVisitorStore } from "../store/visitorStore";

/**
 * Service layer cho Visitor operations
 * Kết hợp API calls với store management
 */
export const visitorService = {
  /**
   * Load tất cả visitors từ API
   */
  loadVisitors: async () => {
    const { setLoading, setError, setVisitors, setTotal } =
      useVisitorStore.getState();

    try {
      setLoading(true);
      setError(null);

      const response = await visitorApi.getAll();
      setVisitors(response.data);
      setTotal(response.total);
    } catch (error) {
      setError(error.message || "Failed to load visitors");
      console.error("Load visitors error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  /**
   * Load recent visitors
   */
  loadRecentVisitors: async (limit = 10) => {
    const { setLoading, setError, setVisitors } = useVisitorStore.getState();

    try {
      setLoading(true);
      setError(null);

      const visitors = await visitorApi.getRecent(limit);
      setVisitors(visitors);
    } catch (error) {
      setError(error.message || "Failed to load recent visitors");
      console.error("Load recent visitors error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  /**
   * Tạo visitor mới
   */
  createVisitor: async (visitorData) => {
    const { setLoading, setError, addVisitor } = useVisitorStore.getState();

    try {
      setLoading(true);
      setError(null);

      const newVisitor = await visitorApi.create(visitorData);
      addVisitor(newVisitor);
      return newVisitor;
    } catch (error) {
      setError(error.message || "Failed to create visitor");
      console.error("Create visitor error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  /**
   * Update visitor
   */
  updateVisitor: async (id, visitorData) => {
    const { setLoading, setError, updateVisitor } = useVisitorStore.getState();

    try {
      setLoading(true);
      setError(null);

      const updatedVisitor = await visitorApi.update(id, visitorData);
      updateVisitor(id, updatedVisitor);
      return updatedVisitor;
    } catch (error) {
      setError(error.message || "Failed to update visitor");
      console.error("Update visitor error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  /**
   * Delete visitor
   */
  deleteVisitor: async (id) => {
    const { setLoading, setError, removeVisitor } = useVisitorStore.getState();

    try {
      setLoading(true);
      setError(null);

      await visitorApi.delete(id);
      removeVisitor(id);
    } catch (error) {
      setError(error.message || "Failed to delete visitor");
      console.error("Delete visitor error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  },
};
