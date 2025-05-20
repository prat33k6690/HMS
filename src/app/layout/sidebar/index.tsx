import React, { useRef, useEffect, useState } from "react";
import Navmenu from "./Navmenu";
import { menuItems } from "./menu";

// Hook to manage sidebar collapse
const useSidebar = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return [collapsed, setCollapsed];
};

// Hook to manage semi-dark theme
const useSemiDark = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isSemiDark, setIsSemiDark] = useState<boolean>(false);
  return [isSemiDark, setIsSemiDark];
};

// Hook to manage skin style
const useSkin = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [skin, setSkin] = useState<string>("default");
  return [skin, setSkin];
};

const Sidebar: React.FC = () => {
  const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState<boolean>(false);
  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState<boolean>(false);
  const [isSemiDark] = useSemiDark();
  const [skin] = useSkin();

  useEffect(() => {
    const handleScroll = () => {
      if (
        scrollableNodeRef.current &&
        scrollableNodeRef.current.scrollTop > 0
      ) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    const node = scrollableNodeRef.current;
    if (node) {
      node.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (node) {
        node.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper bg-white dark:bg-slate-800
          ${collapsed ? "w-[72px] close_sidebar" : "w-[248px]"}
          ${menuHover ? "sidebar-hovered" : ""}
          ${skin === "bordered"
            ? "border-r border-slate-200 dark:border-slate-700"
            : "shadow-base"
          }`}
        onMouseEnter={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      >
        <div
          className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${scroll ? "opacity-100" : "opacity-0"
            }`}
        ></div>
        <Navmenu menus={menuItems} />
      </div>
    </div>
  );
};

export default Sidebar;
