import React, { useState, useEffect, Suspense, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./sidebar/index";
import { Container } from "react-bootstrap";


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
      <Container fluid className="p-0">
        <Header setIsMenuBar={setIsMenuBar} />
      </Container>
      {menuType === "vertical" && width > breakpoints.xl && !menuHidden && (
        <Sidebar
        />
      )}
      {width < breakpoints.xl && mobileMenu && (
        <div
          className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
          onClick={() => setMobileMenu(false)}></div>
      )}
      <div className={`content-wrapper transition-all duration-150 ${width > 1280 ? switchHeaderClass() : ""}`} >
        <div className="page-content page-min-height">
          <div
            className={contentWidth === "boxed" ? "container mx-auto" : "container-fluid"}>
            <Outlet />
          </div>
        </div>
      </div>
      {width > breakpoints.md && (
        <Footer />
      )}
    </>
  );
};

export default Layout;
