import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from '../../assests/images/logo.jpg';
import './Sidebar.css'
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";

// Define the type for submenu items
interface SubMenuItem {
  childtitle: string;
  childlink: string;
  childicon: string;
}


// Define the type for main menu items
interface MenuItem {
  isHeadr?: boolean;
  title: string;
  icon?: string;
  link?: string;
  badge?: string;
  child?: SubMenuItem[];
}

// Define the props for the component
interface NavmenuProps {
  menus: MenuItem[];
}

const Navmenu: React.FC<NavmenuProps> = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = useLocation();
  const locationName = location.pathname.replace("/", "");
  const [mobileMenu, setMobileMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let submenuIndex: number | null = null;

    menus.forEach((item, i) => {
      if (!item.child) return;
      const childIndex = item.child.findIndex(
        (ci) => ci.childlink === locationName
      );
      if (childIndex !== -1) {
        submenuIndex = i;
      }
    });

    document.title = `Dashcode | ${locationName}`;
    setActiveSubmenu(submenuIndex);


    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [location]);

  return (
    <>
      <div>
        <img className="w-60 mx-4 mt-2" src={logo} alt="image" />
      </div>
      <ul className="overflow-scroll h-95">
        {menus.map((item, i) => (
          <li
            key={i}
            className={`single-sidebar-menu 
            ${item.child ? "item-has-children" : ""}
            ${activeSubmenu === i ? "open" : ""}
            ${locationName === item.link ? "menu-item-active" : ""}`}
          >
            {/* Single menu with no children */}
            {!item.child && !item.isHeadr && item.link && (
              <NavLink className="menu-link" to={item.link}>
                <span className="menu-icon pe-2 flex-grow-0">
                  <Icon icon={item.icon || ""} />
                </span>
                <div className="text-box flex-grow menu-text">{item.title}</div>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </NavLink>
            )}

            {/* Menu label only */}
            {item.isHeadr && !item.child && (
              <div className="menulabel ps-1">{item.title}</div>
            )}

            {/* Submenu parent */}
            {item.child && (
              <div
                className={`menu-link d-flex justify-content-between align-items-center px-2 py-2 cursor-pointer ${activeSubmenu === i
                  ? "parent_active not-collapsed background-light"
                  : "collapsed"
                  }`}
                onClick={() => toggleSubmenu(i)}
              >
                {/* Icon and title aligned left */}
                <div className="d-flex align-items-center gap-2">
                  <span className="menu-icon">
                    <Icon icon={item.icon || ""} width="18" height="18" />
                  </span>
                  <span className="menu-text fw-medium">{item.title}</span>
                </div>

                <div
                  className={`menu-arrow d-flex align-items-center justify-content-center rounded-circle transition-transform ${activeSubmenu === i ? "rotate-icon" : ""
                    }`}
                >
                  <Icon icon="heroicons-outline:chevron-right" width="14" height="14" />
                </div>
              </div>
            )}

            <Sidebar activeSubmenu={activeSubmenu} item={item} i={i} isMenuBar={false} setIsMenuBar={function (value: React.SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navmenu;
