import { useState } from "react";
import { MenuContext } from "./menuContext";
import { MenuItem } from "@/types/menu";

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [color, setColor] = useState("#575757");
  const [active, setActive] = useState<MenuItem>("dashboard");
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  return (
    <MenuContext.Provider value={{ active, setActive, color, setColor, showSidebar, setShowSidebar }}>
      {children}
    </MenuContext.Provider>
  );
};
