"use client";
import Header from "@/components/molecules/header";
import Sidebar from "@/components/molecules/sidebar";
import { MenuProvider } from "@/context/menuProvider";
import { useState } from "react";

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useState(false);
  return (
    <MenuProvider>
      <div className="flex">
        <Sidebar collapsed={open} onToggle={() => setOpen(!open)} />
        <div className="w-full bg-white rounded-3xl p-4 m-4">
          <Header />
          <div>{children}</div>
        </div>
      </div>
    </MenuProvider>
  );
};

export default UserLayout;
