"use client";

import { ChevronRight, Heart, LogOut, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AnalyticsIcon,
  AttendanceIcon,
  ClientsIcon,
  CompaniesIcon,
  CustomerIcon,
  DashboardIcon,
  MessageIcon,
  SettingsIcon,
  TrackingIcon,
  PanelIcon,
} from "../atoms/icons";
import logo from "@/public/images/Logo.png";
import logoSmall from "@/public/images/wheel.png";
import contact from "@/public/images/contact.png";
import logout from "@/public/images/logout.png";
import Image from "next/image";
import { SearchBar } from "./searchBar";
import command from "@/public/images/caommand-button.png"
import { useMenu } from "@/context/menuContext";
import { MenuItem } from "@/types/menu";
import Link from "next/link";

interface MenuItemType {
  key: MenuItem;
  label: string;
  link: string
}
export const ICONS = {
  dashboard: DashboardIcon,
  analytics: AnalyticsIcon,
  tracking: TrackingIcon,
  customer: CustomerIcon,
  clients: ClientsIcon,
  companies: CompaniesIcon,
  attendance: AttendanceIcon,
  message: MessageIcon,
  settings: SettingsIcon,
  panel: PanelIcon,
};

export const Icon = ({
  name,
  color = "currentColor",
  size = 22,
  ...props
}: {
  name: string;
  color: string;
  size: number;
}) => {
  const Cmp = ICONS[name as keyof typeof ICONS];
  if (!Cmp) return null;
  return <Cmp color={color} size={size} {...props} />;
};
const MENU: MenuItemType[] = [
  { link: "/dashboard", key: "dashboard", label: "Dashboard" },
  { link: "#", key: "analytics", label: "Analytics" },
  { link: "", key: "tracking", label: "Tracking" },
  { link: "", key: "customer", label: "Customer" },
  { link: "", key: "clients", label: "Clients" },
  { link: "", key: "companies", label: "Companies" },
  { link: "/attendance", key: "attendance", label: "Attendance" },
  { link: "", key: "message", label: "Message" },
  { link: "", key: "settings", label: "Settings" },
];

// const navItems = [
//   { icon: <House className="w-4 text-primary" />, label: "Home", link:"/dashboard" },
//   {
//     icon: <UserCog className="w-4 text-primary" />,
//     label: "Administration",

//     hasChildren: true,
//     child: [
//       {
//         icon: <Database className="w-4 text-primary" />,
//         label: "Account",
//         hasChildren: false,
//         child: null,
//         link: "/allGuide"
//       },
//     ],
//   },
//   {
//     icon: <LockKeyhole className="w-4 text-primary" />,
//     label: "Assignment",
//     hasChildren: true,
//     child: [
//       {
//         icon: <Database className="w-4 text-primary" />,
//         label: "Task 1",
//         hasChildren: false,
//         child: null,
//         link: "/allGuide"
//       },
//     ],
//   },
// ];

const Sidebar = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) => {
  //   const { openItem, setOpenItem, user, logout, smallNav, setSmallNav } = useUser();

  const {active, color, setColor, setActive, setShowSidebar} = useMenu()
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSearch(q: string) {}
  const handleNav = (nav: MenuItemType) => {
    setActive(nav.key)
  }

  return (
    <aside
      className={`relative flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300 ml-2 ${
        collapsed ? "w-16" : "w-60 2xl:w-96"
      }`}
    >
      <div className="border-b border-alight-gray-border">

        {collapsed && (
          <div className="flex lg:hidden pt-4 rounded-2xl bg-primary items-center justify-center shrink-0">
            <X
              size={25}
              className="text-white rounded-full bg-aorange"
              onClick={() => setShowSidebar(false)}
            />
          </div>
        )}
      <div className="flex items-center gap-2 px-4 py-5 ">

        {!collapsed ? (
          <Image src={logo} alt="" className="w-32" />
        ) : (
          <Image src={logoSmall} alt="" className="w-6" />
        )}

        <button
          onClick={onToggle}
          className="ml-auto text-primary transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <Icon name={`panel`} color="#A5A5A5" size={24} />
          )}
        </button>
      </div>
        {!collapsed && <div className="pt-2 pb-4 px-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            loading={loading}
            onSubmit={handleSearch}
            iconClass="text-agray"
            className="placeholder:text-agray"
            trailing={
              <button
                type="button"
                className="ml-1 flex items-center gap-1 text-xs font-medium text-agray py-1 px-1.5 bg-[#F5F5F5] rounded-sm"
              >
                <Image src={command} alt="" className="w-4"/>
                <span>F</span>
              </button>
            }
          />
        </div>}
      </div>

      {!collapsed && (
        <div className="px-4 pt-5 font-bold">
          <p className=" text-agray font-medium text-sm">GENERAL</p>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto pl-4 pr-2 py-4 space-y-3">
        {MENU.map((item) => {
          const { key, label } = item;
          const isActive = active === item.key;
          return (
            <Link key={label} href={item.link}>
            <div >
              <div
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-base cursor-pointer transition-colors 
                   
                `}
                onClick={() => setActive(item.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px",
                  cursor: "pointer",
                  color: isActive ? "#FF7A00" : "#575757",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <Icon
                  name={item.key}
                  color={isActive ? "#FF7A00" : color}
                  size={20}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{label}</span>
                  </>
                )}
              </div>
            </div>
            </Link>
          );
        })}
      </nav>

      <div className=" px-3 py-3 flex flex-col gap-3">
        <div className="text-[#575757] flex items-center gap-2 ">
          <Image src={contact} alt="" />
          {!collapsed && <span>Contact Us</span>}
        </div>
        <div className="flex items-center gap-2">
          <Image src={logout} alt="" />

          {!collapsed && <span>Log Out</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
