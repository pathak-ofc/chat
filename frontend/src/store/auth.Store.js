import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const baseURL = (import.meta.env.mode = "development"
  ? "http://localhost:3000"
  : "/");

export const authStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpddatingProfile: false,
  socket: null,
  onlineUsers: [],

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Account Created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/protected");
      set({ authUser: res.data });
      get().connectSocket();
      console.log("success:", res.data);
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpddatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpddatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(baseURL, {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
