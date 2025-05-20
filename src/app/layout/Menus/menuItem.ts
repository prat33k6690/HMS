
import {
  BiHomeAlt,
  BiBookmarkAlt,
  BiSolidMegaphone,
  BiFile,
  BiCube,
  BiBookmarks,
} from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

export const menuItem = [
  {
    id: 1,
    name: "Dashboard",
    Icon: BiHomeAlt,
    link: "/dashboard",
  },

  {
    id: 2,
    name: "KYC Verification",
    Icon: BiFile,
    link: "KYC-Verification",
  },
    {
    id: 3,
    name: "Admin",
    Icon: BiBookmarks,
    link: "/admin",
  },

  {
    id: 4,
    name: "Setting",
    Icon: IoSettingsOutline,
    link: "/setting",
  },
    {
    id: 5,
    name: "Report",
    Icon: BiCube,
    link: "/report",
  },
];