"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  // "center" for dialogs, "right" for a side drawer
  placement?: "center" | "right";
  size?: "sm" | "md";
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  placement = "center",
  size = "md",
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const isDrawer = placement === "right";
  const panel = isDrawer
    ? "ml-auto h-full w-full max-w-sm"
    : `m-auto w-full rounded-2xl max-h-full ${size === "sm" ? "max-w-sm" : "max-w-md"}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex bg-dark-gray/40 ${isDrawer ? "" : "p-4"}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`flex flex-col overflow-y-auto bg-white shadow-xl ${panel}`}
      >
        {title && (
          <div className="flex items-start justify-between gap-4 px-5 pt-5">
            <div>
              <h2 className="text-base font-semibold text-dark-gray">{title}</h2>
              {subtitle && <p className="text-xs text-agray">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-agray hover:text-dark-gray"
            >
              <X size={18} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
