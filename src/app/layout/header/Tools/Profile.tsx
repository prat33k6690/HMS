import React from "react";
import Dropdown from "../../../component/ui/Dropdown/Dropdown"; // Assume this is compatible

import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserAvatar from "../../../assests/images/image.png";
import { Icon } from "@iconify/react";

// Define a type for menu items
interface MenuItem {
  label: string;
  icon: string;
  action: () => void;
  hasDivider?: boolean;
}

// Render label with avatar and name
const profileLabel = () => {
  return (
    <div className="d-flex align-items-center">
      <div className="me-2">
        <div className="rounded-circle overflow-hidden" style={{ width: 32, height: 32 }}>
          <img
            src={UserAvatar}
            alt="User"
            className="img-fluid w-100 h-100 object-fit-cover rounded-circle"
          />
        </div>
      </div>
      <div className="d-none d-lg-flex align-items-center text-secondary text-sm">
        <span className="text-truncate d-block" style={{ maxWidth: 85 }}>
          Albert Flores
        </span>
        <span className="ms-2 fs-6">
          <Icon icon="heroicons-outline:chevron-down" />
        </span>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ProfileMenu: MenuItem[] = [
    { label: "Profile", icon: "heroicons-outline:user", action: () => console.log("profile") },
    { label: "Chat", icon: "heroicons-outline:chat", action: () => console.log("chat") },
    { label: "Email", icon: "heroicons-outline:mail", action: () => console.log("email") },
    { label: "Todo", icon: "heroicons-outline:clipboard-check", action: () => console.log("todo") },
    { label: "Settings", icon: "heroicons-outline:cog", action: () => console.log("settings") },
    { label: "Price", icon: "heroicons-outline:credit-card", action: () => console.log("price") },
    { label: "Faq", icon: "heroicons-outline:information-circle", action: () => console.log("faq") },
    { label: "Logout", icon: "heroicons-outline:login", action: () => console.log("logout") },
  ];

  return (

    <Dropdown label={profileLabel()} classMenuItems="dropdown-menu dropdown-menu-end mt-2 show">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }: { active: boolean }) => (
            <div
              onClick={item.action}
              className={`dropdown-item d-flex align-items-center ${
                item.hasDivider ? "border-top pt-2 mt-2" : ""
              } ${active ? "bg-light" : ""}`}
              role="button"
            >
              <span className="me-2 fs-5">
                <Icon icon={item.icon} />
              </span>
              <span className="fs-6">{item.label}</span>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
