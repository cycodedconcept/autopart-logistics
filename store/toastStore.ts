import { create } from "zustand";

export type ToastTone = "success" | "error";

interface ToastState {
  toast: { message: string; tone: ToastTone } | null;
  showToast: (message: string, tone?: ToastTone) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  toast: null,
  showToast: (message, tone = "success") => set({ toast: { message, tone } }),
  clearToast: () => set({ toast: null }),
}));
