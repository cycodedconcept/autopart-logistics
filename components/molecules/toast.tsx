"use client";

import { useEffect } from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";
import { useToastStore } from "@/store/toastStore";

const TOAST_MS = 4000;

const Toast = () => {
  const toast = useToastStore((s) => s.toast);
  const clearToast = useToastStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(clearToast, TOAST_MS);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;
  const ToastIcon = toast.tone === "success" ? CheckCircle2 : CircleAlert;

  return (
    <div
      role="status"
      className="fixed bottom-4 right-4 left-4 sm:left-auto z-60 flex items-center gap-3 rounded-xl bg-dark-gray px-4 py-3 text-sm text-white shadow-lg sm:max-w-sm"
    >
      <ToastIcon
        size={18}
        className={`shrink-0 ${toast.tone === "success" ? "text-light-green" : "text-light-red"}`}
      />
      <p className="flex-1">{toast.message}</p>
      <button type="button" onClick={clearToast} aria-label="Dismiss" className="text-agray hover:text-white">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
