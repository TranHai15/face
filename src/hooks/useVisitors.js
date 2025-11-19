import { useEffect } from "react";
import { useVisitorStore } from "../store/visitorStore";
import { visitorService } from "../services/visitorService";

/**
 * Custom hook để quản lý visitors
 * @returns {Object} Visitor state và actions
 */
export function useVisitors() {
  const {
    visitors,
    currentVisitor,
    isLoading,
    error,
    total,
    setCurrentVisitor,
    clearCurrentVisitor,
  } = useVisitorStore();

  /**
   * Load visitors khi component mount
   */
  useEffect(() => {
    visitorService.loadVisitors().catch((err) => {
      console.error("Failed to load visitors:", err);
    });
  }, []);

  return {
    visitors,
    currentVisitor,
    isLoading,
    error,
    total,
    setCurrentVisitor,
    clearCurrentVisitor,
    refresh: () => visitorService.loadVisitors(),
  };
}
