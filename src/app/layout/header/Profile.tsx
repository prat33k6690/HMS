import React from "react";
import { Link } from "react-router-dom";
import { BiUser, BiLogOutCircle } from "react-icons/bi";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5"
const Profile = ({ isProfile, profileRef, screenWidth }: any) => {
  const navigate = useNavigate();

  return (
    <div >
      <div>
        {isProfile && (
          <div className={`${screenWidth >= 875 ? "" : "bg-sidebar"}`}></div>
        )}
        <div
          className={`profile-menu-section ${screenWidth >= 450 ? "" : "MobileProfile-section"
            }`}
          ref={profileRef}
        >
          <ul style={{ fontSize: "13px" }} className="d-grid table-hover  align-items-center justify-content-center gap-2 mt-3 text-md fw-medium text-black text-muted">
            <li className=" border-bottom  px-4 py-1 rounded cursor-pointer flex items-center gap-2 hover-effect">
              <div style={{ fontSize: "10px", width: '120px' }} className="d-flex gap-2   align-items-center profile-media"><div className="ProfileHeader-icon rounded-circle"><img className="img-fluid" src="https://admin.pixelstrap.net/miami/assets/images/dashboard/profile.png" alt="" /></div>
                <div className="flex-grow-1"><span>Ava Davis</span>
                  <p className="mb-0">Web Designer</p>
                </div>
              </div>
            </li>
            <li className="  px-4 py-1 rounded cursor-pointer flex items-center hover-effect gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </li>
            <li className="  px-4 py-1 rounded cursor-pointer flex items-center gap-2 hover-effect">
              <IoSettingsOutline size={24} className="fw-bolder" />
              Setting
            </li>
            <li className="  px-4 py-1 rounded cursor-pointer flex items-center gap-2 hover-effect">
              <IoLogOutOutline size={24} className="fw-bolder" />
              Log Out
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Profile;
