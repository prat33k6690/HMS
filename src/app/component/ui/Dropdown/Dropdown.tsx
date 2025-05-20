import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Fragment, ReactNode } from "react";
import { NavLink } from "react-router-dom";

type DropdownItem = {
  label: string;
  link?: string;
  icon?: string;
  hasDivider?: boolean;
};

type DropdownProps = {
  label?: string | ReactNode;
  wrapperClass?: string;
  labelClass?: string;
  children?: ReactNode;
  classMenuItems?: string;
  items?: DropdownItem[];
  classItem?: string;
  className?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label = "Dropdown",
  wrapperClass = "d-inline-block",
  labelClass = "btn btn-secondary dropdown-toggle",
  children,
  classMenuItems = "mt-2",
  items = [
    {
      label: "Action",
      link: "#",
    },
    {
      label: "Another action",
      link: "#",
    },
    {
      label: "Something else here",
      link: "#",
    },
  ],
  classItem = "dropdown-item",
  className = "",
}) => {
  return (
    <div className={`position-relative ${wrapperClass}`}>
      <Menu as="div" className={`w-100 ${className}`}>
        <Menu.Button className="w-100">
          <div className={labelClass}>{label}</div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`dropdown-menu dropdown-menu-end shadow ${classMenuItems}`}
            style={{ display: "block", position: "absolute", zIndex: 9999 }}
          >
            <div>
              {children
                ? children
                : items?.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <div
                          className={`${active ? "active bg-light text-dark" : "text-body"} ${
                            item.hasDivider ? "border-top border-secondary" : ""
                          }`}
                        >
                          {item.link ? (
                            <NavLink to={item.link} className={classItem}>
                              {item.icon ? (
                                <div className="d-flex align-items-center">
                                  <span className="me-2">
                                    <Icon icon={item.icon} />
                                  </span>
                                  <span>{item.label}</span>
                                </div>
                              ) : (
                                <span>{item.label}</span>
                              )}
                            </NavLink>
                          ) : (
                            <div className={`cursor-pointer ${classItem}`}>
                              {item.icon ? (
                                <div className="d-flex align-items-center">
                                  <span className="me-2">
                                    <Icon icon={item.icon} />
                                  </span>
                                  <span>{item.label}</span>
                                </div>
                              ) : (
                                <span>{item.label}</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </Menu.Item>
                  ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
