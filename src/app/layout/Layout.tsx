import React, { useState, useEffect, Suspense, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./sidebar/index";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../component/ui/Breadcrumbs";


const defaultBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const Layout: React.FC = () => {
  // State instead of custom hooks
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [contentWidth, setContentWidth] = useState<"boxed" | "full">("full");
  const [menuType, setMenuType] = useState<"vertical" | "horizontal">("vertical");
  const [menuHidden, setMenuHidden] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(true);
  const [isMenuBar, setIsMenuBar] = useState<boolean>(true);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const breakpoints = defaultBreakpoints;

  const navigate = useNavigate();
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const switchHeaderClass = (): string => {
    if (menuType === "horizontal" || menuHidden) {
      return "ltr:ml-0 rtl:mr-0";
    } else if (collapsed) {
      return "ltr:ml-[72px] rtl:mr-[72px]";
    } else {
      return "ltr:ml-[248px] rtl:mr-[248px]";
    }
  };

  return (
    <>
      <ToastContainer />
      <Sidebar
      />
      <div
        className={`${width >= 875 && isMenuBar ? "main-Container" : "full-container"
          }  `}
      >
        <div
          className={`Screens-Container position-relative hideScroll px-4 py-2 ${width <= 875 && "mx-2"
            } "screen-container-0 `} style={{
              height: "88vh",
              overflowY: "scroll",
            }}
        >
          <Breadcrumbs />
          <Outlet />
        </div>
        <Footer />

      </div>
    </>
  );
};

export default Layout;
