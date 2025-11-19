import { create } from "zustand";

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
 * Zustand store cho quản lý visitors
 */
export const useVisitorStore = create((set, get) => ({
  // State
  visitors: [],
  currentVisitor: null,
  isLoading: false,
  error: null,
  total: 0,

  // Actions
  /**
   * Set loading state
   */
  setLoading: (isLoading) => set({ isLoading }),

  /**
   * Set error
   */
  setError: (error) => set({ error }),

  /**
   * Set visitors list
   */
  setVisitors: (visitors) => set({ visitors }),

  /**
   * Add visitor to list (thêm vào đầu)
   */
  addVisitor: (visitor) => {
    const { visitors } = get();
    // Kiểm tra xem visitor đã tồn tại chưa
    const exists = visitors.some((v) => v.id === visitor.id);
    if (!exists) {
      set({ visitors: [visitor, ...visitors] });
    }
  },

  /**
   * Update visitor in list
   */
  updateVisitor: (id, updatedData) => {
    const { visitors } = get();
    set({
      visitors: visitors.map((v) =>
        v.id === id ? { ...v, ...updatedData } : v
      ),
    });
  },

  /**
   * Remove visitor from list
   */
  removeVisitor: (id) => {
    const { visitors } = get();
    set({ visitors: visitors.filter((v) => v.id !== id) });
  },

  /**
   * Set current visitor (đang hiển thị welcome screen)
   */
  setCurrentVisitor: (visitor) => set({ currentVisitor: visitor }),

  /**
   * Clear current visitor
   */
  clearCurrentVisitor: () => set({ currentVisitor: null }),

  /**
   * Set total count
   */
  setTotal: (total) => set({ total }),

  /**
   * Reset store
   */
  reset: () =>
    set({
      visitors: [],
      currentVisitor: null,
      isLoading: false,
      error: null,
      total: 0,
    }),
}));

