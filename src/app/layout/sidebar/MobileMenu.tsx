import React, { useRef, useEffect, useState } from "react";

import Navmenu from "./Navmenu";
import { menuItems } from "./menu"
import { Link } from "react-router-dom";
import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import { Icon } from "@iconify/react";

interface MobileMenuProps {
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className = "custom-class" }) => {
  const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current?.scrollTop! > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    const current = scrollableNodeRef.current;
    current?.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSemiDark] = useState();
  const [skin] = useState();
  const [isDark] = useState();
  const [mobileMenu, setMobileMenu] = useState(true);

  return (
    <div
      className={`${className} fixed top-0 bg-white dark:bg-slate-800 shadow-lg h-full w-[248px]`}
    >
      <div className="logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] h-[85px] px-4">
        <Link to="/dashboard">
          <div className="flex items-center space-x-4">
            <div className="logo-icon">
              {!isDark && !isSemiDark ? (
                <img src={MobileLogo} alt="Logo" />
              ) : (
                <img src={MobileLogoWhite} alt="Logo White" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                DashCode
              </h1>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="cursor-pointer text-slate-900 dark:text-white text-2xl"
          aria-label="Toggle Mobile Menu"
        >
          <Icon icon="heroicons:x-mark" />
        </button>
      </div>

      <div
        className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
          scroll ? "opacity-100" : "opacity-0"
        }`}
      ></div>
        <Navmenu menus={menuItems} />
    </div>
  );
};

export default MobileMenu;
