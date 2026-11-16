"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Avatar from "@/components/atoms/avatar";
import { useLogout } from "@/app/libs/queries";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAuthStore } from "@/store/authStore";

const LINKS = [
  { href: "#", label: "Profile" },
  { href: "#", label: "Account Settings" },
  { href: "#", label: "Billing" },
];

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  const router = useRouter();
  const logout = useLogout();
  const companyName = useAuthStore((s) => s.user?.name) ?? "Account";

  const handleSignOut = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-background"
      >
        <Avatar name={companyName} size="sm" />
        <span className="hidden sm:inline max-w-36 truncate text-sm font-medium text-dark-gray">
          {companyName}
        </span>
        <ChevronDown size={16} className="text-agray" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 z-30 w-48 rounded-xl border border-alight-gray-border bg-white py-1.5 shadow-lg"
        >
          {/* {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              role="menuitem"
              onClick={close}
              className="block px-4 py-2 text-sm text-dark-gray hover:bg-background"
            >
              {link.label}
            </Link>
          ))} */}
          <div className="my-1 border-t border-alight-gray-border" />
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-sm font-medium text-ared hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
