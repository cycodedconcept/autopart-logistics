"use client";
import Header from "@/components/molecules/header";
import Sidebar from "@/components/molecules/sidebar";
import { MenuProvider } from "@/context/menuProvider";
import { useState } from "react";

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useState(false);
  return (
    <MenuProvider>
      <div className="flex h-screen">
        <Sidebar collapsed={open} onToggle={() => setOpen(!open)} />
        <div className="w-full xl:w-[85%] 2xl:w-[73%] m-auto bg-white rounded-3xl p-4 2xl:px-8 my-4">
          <Header />
          <div className="overflow-y-auto max-h-11/12">{children}</div>
        </div>
      </div>
    </MenuProvider>
  );
};

export default UserLayout;
