/**
 * Environment Configuration
 * Cấu hình các biến môi trường cho ứng dụng
 */
export const env = {
  // API Configuration
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,

  // SignalR Configuration
  SIGNALR_URL:
    import.meta.env.VITE_SIGNALR_URL ||
    "https://apigocheckinv4.gosol.com.vn/eventHub",
  SIGNALR_RECONNECT_INTERVAL:
    parseInt(import.meta.env.VITE_SIGNALR_RECONNECT_INTERVAL) || 5000,
  SIGNALR_MAX_RECONNECT_ATTEMPTS:
    parseInt(import.meta.env.VITE_SIGNALR_MAX_RECONNECT_ATTEMPTS) || 10,
  USE_MOCK_SIGNALR: import.meta.env.VITE_USE_MOCK_SIGNALR === "true" || false,

  // Application Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || "AI Face Recognition System",
  WELCOME_DISPLAY_DURATION:
    parseInt(import.meta.env.VITE_WELCOME_DISPLAY_DURATION) || 3000,
};
