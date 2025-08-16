// socketService.ts - Socket connection utility
import { io, Socket } from 'socket.io-client';

/**
 * Socket service for handling real-time communication
 */
class SocketService {
  private socket: Socket | null = null;
  private isInitialized = false;

  /**
   * Initialize the socket connection
   * @param url The socket server URL
   */
  initialize(url: string) {
    if (this.isInitialized) return;
    
    try {
      this.socket = io(url, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket'],
      });
      
      this.isInitialized = true;
      console.log('Socket service initialized');
    } catch (error) {
      console.error('Socket initialization error:', error);
    }
  }

  /**
   * Get the socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Connect to the socket server
   */
  connect() {
    if (this.socket && this.socket.disconnected) {
      this.socket.connect();
    }
  }

  /**
   * Disconnect from the socket server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  /**
   * Listen for an event
   * @param event Event name
   * @param callback Callback function
   */
  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  /**
   * Emit an event
   * @param event Event name
   * @param data Data to send
   */
  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  /**
   * Remove event listener
   * @param event Event name
   * @param callback Callback function (optional)
   */
  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }
}

// Create a singleton instance
export const socketService = new SocketService();

// Initialize the socket with a default URL, this can be updated from the application
if (typeof window !== 'undefined') {
  // Only initialize in browser environment
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  socketService.initialize(API_URL);
}