"use client";

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Bell } from "lucide-react";
import { JOB_STATUS_TEXT, jobRiderName } from "@/app/libs/mappers";
import { useCompanyJobs } from "@/app/libs/queries";
import { useClickOutside } from "@/hooks/useClickOutside";
import { timeAgo } from "@/lib/format";

const MAX_ITEMS = 6;
const SEEN_KEY = "notifications-last-seen";

// When the user last marked notifications as read, kept per browser
const seenListeners = new Set<() => void>();
const readLastSeen = () => {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0;
  } catch {
    return 0;
  }
};
const writeLastSeen = (time: number) => {
  try {
    localStorage.setItem(SEEN_KEY, String(time));
  } catch {
    // Storage blocked: the badge just won't persist across reloads
  }
  seenListeners.forEach((listener) => listener());
};
const subscribeLastSeen = (listener: () => void) => {
  seenListeners.add(listener);
  return () => seenListeners.delete(listener);
};

const NotificationsMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  const { data, isLoading, error } = useCompanyJobs();
  // Server and first client render treat everything as seen to avoid a hydration mismatch
  const lastSeen = useSyncExternalStore(subscribeLastSeen, readLastSeen, () => Infinity);

  const items = useMemo(
    () =>
      [...(data?.jobs ?? [])]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, MAX_ITEMS)
        .map((job) => ({
          id: job.id,
          message: `${job.jobCode} ${JOB_STATUS_TEXT[job.status]} · ${jobRiderName(job)}`,
          updatedAt: job.updatedAt,
          read: new Date(job.updatedAt).getTime() <= lastSeen,
        })),
    [data, lastSeen]
  );

  const unread = items.filter((n) => !n.read).length;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        className="relative flex items-center justify-center size-9 rounded-lg border border-alight-gray-border bg-white text-light-gray hover:text-dark-gray"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-aorange text-[10px] font-semibold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-30 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-alight-gray-border bg-white shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-alight-gray-border">
            <p className="text-sm font-semibold text-dark-gray">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={() => writeLastSeen(Date.now())}
                className="text-xs font-medium text-aorange"
              >
                Mark all read
              </button>
            )}
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {isLoading && <li className="px-4 py-6 text-center text-sm text-agray">Loading...</li>}
            {error && <li className="px-4 py-6 text-center text-sm text-ared">{error.message}</li>}
            {!isLoading && !error && items.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-agray">No updates yet.</li>
            )}
            {items.map((n) => (
              <li
                key={n.id}
                className="flex gap-3 px-4 py-3 border-b border-alight-gray-border last:border-0"
              >
                <span
                  className={`mt-1.5 size-1.5 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-aorange"}`}
                />
                <div>
                  <p className={`text-sm ${n.read ? "text-light-gray" : "text-dark-gray"}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-agray">{timeAgo(n.updatedAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;
