import * as signalR from "@microsoft/signalr";
import { env } from "../config/env";

/**
 * SignalR Service - Service Layer
 * Chỉ quản lý kết nối SignalR, không xử lý business logic
 *
 * Chức năng:
 * - Khởi tạo và quản lý kết nối SignalR
 * - Cung cấp các hàm: connect, disconnect, on, off, invoke
 * - Tự động reconnect khi mất kết nối
 * - Quản lý event handlers
 */
class SignalRService {
  constructor() {
    this.connection = null;
    this._isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = env.SIGNALR_MAX_RECONNECT_ATTEMPTS;
    this.reconnectInterval = env.SIGNALR_RECONNECT_INTERVAL;
    this.handlers = new Map(); // Lưu các event handlers
  }

  /**
   * Khởi tạo kết nối SignalR
   */
  connect() {
    if (this.connection && this.isConnected) {
      console.log("SignalR already connected");
      return;
    }

    const url = env.SIGNALR_URL;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.previousRetryCount < this.maxReconnectAttempts) {
            return this.reconnectInterval;
          }
          return null; // Stop reconnecting
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Connection events
    this.connection.onclose((error) => {
      this._isConnected = false;
      console.log("SignalR connection closed", error);
      this.onConnectionStateChange?.(false);
    });

    this.connection.onreconnecting((error) => {
      this._isConnected = false;
      console.log("SignalR reconnecting...", error);
      this.onConnectionStateChange?.(false);
    });

    this.connection.onreconnected((connectionId) => {
      this._isConnected = true;
      this.reconnectAttempts = 0;
      console.log("SignalR reconnected:", connectionId);
      this.onConnectionStateChange?.(true);
      this.setupEventHandlers();
    });

    // Start connection
    this.connection
      .start()
      .then(() => {
        this._isConnected = true;
        this.reconnectAttempts = 0;
        console.log("SignalR connected successfully");
        this.onConnectionStateChange?.(true);
        this.setupEventHandlers();
      })
      .catch((error) => {
        console.error("SignalR connection error:", error);
        this._isConnected = false;
        this.onConnectionStateChange?.(false);
      });
  }

  /**
   * Setup các event handlers từ handlers map
   * Gọi lại các handlers đã đăng ký khi kết nối thành công hoặc reconnect
   */
  setupEventHandlers() {
    this.handlers.forEach((handler, eventName) => {
      this.connection.on(eventName, handler);
    });
  }

  /**
   * Đăng ký event handler
   * @param {string} eventName - Tên event từ backend
   * @param {Function} handler - Callback function
   */
  on(eventName, handler) {
    this.handlers.set(eventName, handler);
    if (this.connection && this.isConnected) {
      this.connection.on(eventName, handler);
    }
  }

  /**
   * Hủy đăng ký event handler
   * @param {string} eventName
   */
  off(eventName) {
    this.handlers.delete(eventName);
    if (this.connection) {
      this.connection.off(eventName);
    }
  }

  /**
   * Gửi message đến server
   * @param {string} methodName
   * @param {any} ...args
   */
  async invoke(methodName, ...args) {
    if (!this.connection || !this.isConnected) {
      console.warn("SignalR not connected. Cannot invoke:", methodName);
      return;
    }

    try {
      return await this.connection.invoke(methodName, ...args);
    } catch (error) {
      console.error(`Error invoking ${methodName}:`, error);
      throw error;
    }
  }

  /**
   * Ngắt kết nối
   */
  async disconnect() {
    if (this.connection) {
      try {
        await this.connection.stop();
        this._isConnected = false;
        this.handlers.clear();
        console.log("SignalR disconnected");
        this.onConnectionStateChange?.(false);
      } catch (error) {
        console.error("Error disconnecting SignalR:", error);
      }
    }
  }

  /**
   * Get connection state
   */
  getConnectionState() {
    if (!this.connection) return signalR.HubConnectionState.Disconnected;
    return this.connection.state;
  }

  /**
   * Get isConnected property
   */
  get isConnected() {
    return this._isConnected;
  }

  /**
   * Callback khi connection state thay đổi
   */
  onConnectionStateChange = null;
}

// Flag để switch giữa real SignalR và mock SignalR
const USE_MOCK_SIGNALR = env.USE_MOCK_SIGNALR;

// Export service dựa trên flag
// Nếu USE_MOCK_SIGNALR = true, sử dụng mock service
// Nếu false, sử dụng real SignalR service
export const signalRService = new SignalRService();

/**
 * SignalR Event Names - Định nghĩa các event từ backend
 */
export const SignalREvents = {
  // Visitor Events
  VISITOR_DETECTED: "VisitorDetected", // Khi AI phát hiện visitor mới
};
