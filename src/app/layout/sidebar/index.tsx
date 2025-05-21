import React, { useRef, useEffect, useState } from "react";
import Navmenu from "./Navmenu";
import { menuItems } from "./menu";
import { BiMenuAltLeft } from "react-icons/bi";
import { handleSidebar } from "../../redux/reducers/layout";
import Header from "../header/Header";

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

type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  [key: string]: number;
};

const breakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const Sidebar: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
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

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      if (currentWidth <= breakpoints.md) {
        setMenuCollapsed(true); // Collapse
      } else {
        setMenuCollapsed(false); // Expand when resizing back
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run once on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={isSemiDark ? "dark" : ""}>
      <Header
        setIsMenuBar={""}
        collapsed={collapsed}
        toggleSidebar={() => setMenuCollapsed((prev: boolean) => !prev)}
        width={width}
      />


      <div
        className={`
    sidebar-wrapper
    ${collapsed ? "closed" : ""}
    bg-white dark:bg-slate-800
    ${menuHover ? "sidebar-hovered" : ""}
    ${skin === "bordered"
            ? "border-r border-slate-200 dark:border-slate-700"
            : "shadow-base"
          }
  `}
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
