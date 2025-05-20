import React from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";

// Define the type for each item inside the multi_menu array
interface MultiMenuItem {
  multiTitle: string;
  multiLink: string;
}

// Define the type for subItem which contains multi_menu
interface SubItemWithMulti {
  multi_menu?: MultiMenuItem[] | any;
}


// Define the props for the component
interface MultilevelProps {
  activeMultiMenu: number | null;
  j: number;
  subItem: SubItemWithMulti;
}

const Multilevel: React.FC<MultilevelProps> = ({ activeMultiMenu, j, subItem }) => {
  return (
    <Collapse isOpened={activeMultiMenu === j}>
      <ul className="space-y-[14px] pl-4">
        {subItem.multi_menu?.map((item: any, i: any) => (
          <li key={i} className="first:pt-[14px]">
            <NavLink to={item.multiLink}>
              {({ isActive }) => (
                <span
                  className={`${
                    isActive
                      ? "text-black dark:text-white font-medium"
                      : "text-slate-600 dark:text-slate-300"
                  } text-sm flex space-x-3 items-center transition-all duration-150`}
                >
                  <span
                    className={`${
                      isActive
                        ? "bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                        : ""
                    } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none`}
                  ></span>
                  <span className="flex-1">{item.multiTitle}</span>
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Multilevel;
