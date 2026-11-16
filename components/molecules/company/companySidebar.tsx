"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsUpDown,
  LayoutDashboard,
  Users,
  Wallet,
  X,
} from "lucide-react";
import wheel from "@/public/images/wheel.png";
import Avatar from "@/components/atoms/avatar";
import { useAuthStore } from "@/store/authStore";

const NAV = [
  { href: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/company/riders", label: "Riders", icon: Users },
  { href: "/company/earnings", label: "Earnings", icon: Wallet },
];

interface CompanySidebarProps {
  open: boolean;
  onClose: () => void;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({ open, onClose }) => {
  const pathname = usePathname();
  const company = useAuthStore((s) => s.user);
  const companyName = company?.name ?? "Your company";

  return (
    <>
      {/* Backdrop for the mobile drawer */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-dark-gray/40 lg:hidden transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-white border-r border-alight-gray-border transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2.5 px-4 h-16 shrink-0">
          <span className="flex items-center justify-center size-8 rounded-lg bg-aorange">
            <Image src={wheel} alt="" className="w-4.5 brightness-0 invert" />
          </span>
          <div className="leading-tight">
            <p className="font-instrument-sans font-semibold text-dark-gray">
              AutoParts
            </p>
            <p className="text-[10px] tracking-wider text-agray">LOGISTICS</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto text-light-gray lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mx-3 mb-4 rounded-lg border border-[#FFD4B3] bg-[#FFF4EE] px-3 py-2.5 ">
          <p className="text-[10px] font-semibold tracking-wider text-aorange">
            COMPANY
          </p>
          <p className="text-sm font-semibold text-dark-gray truncate">
            {companyName}
          </p>
        </div>
        <hr className="border-t border-alight-gray-border w-52 m-auto " />
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 mt-4">
          {NAV.map(({ href, label, icon: NavIcon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-[#FFF4EE] border-l-2 border-aorange font-semibold text-aorange"
                    : "text-light-gray hover:bg-background hover:text-dark-gray"
                }`}
              >
                <NavIcon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 border-t border-alight-gray-border px-4 py-4">
          <Avatar name={companyName} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-sm font-semibold text-dark-gray truncate">
              {companyName}
            </p>
            <p className="text-xs text-agray truncate">{company?.email}</p>
          </div>
          <ChevronsUpDown size={16} className="text-agray" />
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;
