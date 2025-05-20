import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";
import { VscCircleFilled } from "react-icons/vsc";
import "./Sidebar.css";
import Multilevel from "./Multi";
import { Icon } from "@iconify/react";

// Type for child menu items
interface SubMenuItem {
  childtitle: string;
  childlink: string;
  childicon: string;
  multi_menu?: boolean;
  // Add additional fields as needed
}

// Props for Submenu component
interface SubmenuProps {
  activeSubmenu: number | null;
  item?: any;
  i: number;
  isMenuBar: boolean;
  setIsMenuBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Submenu: React.FC<SubmenuProps> = ({
  activeSubmenu,
  item,
  i,
  isMenuBar,
  setIsMenuBar,
}) => {
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);

  const toggleMultiMenu = (j: number) => {
    setMultiMenu((prev) => (prev === j ? null : j));
  };

  return (
    <Collapse isOpened={activeSubmenu === i}>
      <ul className="sub-menu space-y-4">
        {item?.child?.map((subItem: any, j: any) => (
          <li key={j} className="px-3 py-2 ps-4">
            {subItem?.multi_menu ? (
              <div>
                <div
                  onClick={() => toggleMultiMenu(j)}
                  className={`d-flex align-items-center justify-content-between text-sm cursor-pointer ${activeMultiMenu === j ? "fw-medium text-dark" : "text-muted"
                    }`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className={`rounded-circle border border-secondary d-inline-block flex-shrink-0`}
                      style={{
                        height: "8px",
                        width: "8px",
                        backgroundColor:
                          activeMultiMenu === j ? "#000" : "transparent",
                      }}
                    ></span>
                    <span>{subItem.childtitle}</span>
                  </div>
                  <span
                    className={`menu-arrow transition-transform ${activeMultiMenu === j ? "rotate-90" : ""
                      }`}
                  >
                    <Icon icon="ph:caret-right" width="14" height="14" />
                  </span>
                </div>

                <Multilevel
                  activeMultiMenu={activeMultiMenu}
                  j={j}
                  subItem={subItem}
                />
              </div>
            ) : (
              <NavLink to={subItem.childlink}>
                {({ isActive }) => (
                  <div
                    className={`d-flex align-items-center gap-2 text-sm ${isActive ? "fw-medium text-dark" : "text-muted"
                      }`}
                  >
                    <span>
                      <VscCircleFilled />
                    </span>
                    <span className="text-sm">{subItem.childtitle}</span>
                  </div>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Submenu;
