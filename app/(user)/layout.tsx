"use client";

import React, { useState } from "react";
import Header from "@/components/molecules/header";
import Sidebar from "@/components/molecules/sidebar";
import SmallHeader from "@/components/molecules/smallHeader";
import { useMenu } from "@/context/menuContext";
import { MenuProvider } from "@/context/menuProvider";

const UserLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { showSidebar } = useMenu();

  return (
    <div className="relative">
      <SmallHeader />
      <div className="flex lg:h-screen">
        {/* Sidebar */}
        <div
          className={`block absolute top-0 z-20 transition-all duration-300 lg:left-0 lg:relative ${
            showSidebar
              ? "left-0 bg-agray/50 w-full fixed lg:bg-transparent lg:w-auto lg:relative"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar collapsed={open} onToggle={() => setOpen(!open)} />
        </div>

        {/* Main Content Area */}
        <div className="w-11/12 lg:w-full xl:w-[85%] 2xl:w-[73%] m-auto bg-white rounded-3xl p-4 2xl:px-8 my-4 flex flex-col">
          <Header />
          <div className="lg:overflow-y-auto lg:max-h-[85vh] flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <MenuProvider>
      <UserLayoutContent>{children}</UserLayoutContent>
    </MenuProvider>
  );
};

export default UserLayout;
