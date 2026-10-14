"use client";

import { Menu, Search, SlidersHorizontal, Sun } from "lucide-react";
import NotificationsMenu from "./notificationsMenu";
import ProfileMenu from "./profileMenu";

interface CompanyTopbarProps {
  onMenuClick: () => void;
}

const CompanyTopbar: React.FC<CompanyTopbarProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center gap-3 h-16 shrink-0 px-4 2xl:px-6 bg-white border-b border-alight-gray-border">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="lg:hidden text-dark-gray"
      >
        <Menu size={22} />
      </button>

      <label className="flex items-center gap-2 w-full max-w-72 h-9 px-3 rounded-3xl border border-alight-gray-border bg-background focus-within:border-aorange">
        <Search size={16} className="shrink-0 text-agray" />
        <input
          type="search"
          placeholder="Search shipments, tracking..."
          className="w-full min-w-0 bg-transparent text-sm text-dark-gray outline-none placeholder:text-agray"
        />
         <SlidersHorizontal className="w-4 text-agray"/>
      </label>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Toggle theme"
          className="hidden sm:flex items-center justify-center size-9 rounded-lg border border-alight-gray-border bg-white text-light-gray hover:text-dark-gray"
        >
          <Sun size={18} />
        </button>
        <NotificationsMenu />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default CompanyTopbar;
