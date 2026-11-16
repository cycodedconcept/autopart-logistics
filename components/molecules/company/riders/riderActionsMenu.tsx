"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { RiderDetails } from "@/types/company";

interface RiderActionsMenuProps {
  rider: RiderDetails;
  onSuspend: () => void;
}

const RiderActionsMenu: React.FC<RiderActionsMenuProps> = ({ rider, onSuspend }) => {
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setPosition(null), []);
  useClickOutside(ref, close, Boolean(position));

  // The menu is fixed-positioned so the table's scroll container can't clip it;
  // close it when the page scrolls instead of tracking the button
  useEffect(() => {
    if (!position) return;
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [position, close]);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (position) return close();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };

  const isSuspended = rider.status === "suspended";

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={toggle}
        aria-label={`Actions for ${rider.name}`}
        aria-expanded={Boolean(position)}
        className="flex size-7 items-center justify-center rounded-md text-agray hover:bg-background hover:text-dark-gray"
      >
        <MoreHorizontal size={16} />
      </button>

      {position && (
        <div
          role="menu"
          style={{ top: position.top, right: position.right }}
          className="fixed z-40 w-40 rounded-xl border border-alight-gray-border bg-white py-1.5 shadow-lg"
        >
          <Link
            href={`/company/riders/${rider.id}`}
            role="menuitem"
            className="block px-3 py-2 text-sm text-dark-gray hover:bg-background"
          >
            View Profile
          </Link>
          {!isSuspended && (
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                close();
                onSuspend();
              }}
              className="block w-full px-3 py-2 text-left text-sm text-ared hover:bg-background"
            >
              Suspend Rider
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RiderActionsMenu;
