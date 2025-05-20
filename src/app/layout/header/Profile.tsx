import React from "react";
import { Link } from "react-router-dom";
import { BiUser, BiLogOutCircle } from "react-icons/bi";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ isProfile, profileRef, screenWidth, setIsProfile }: any) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        {isProfile && (
          <div className={`${screenWidth >= 875 ? "" : "bg-sidebar"}`}></div>
        )}
        <div
          className={`profile-menu-section ${screenWidth >= 450 ? "" : "MobileProfile-section"
            }`}
          ref={profileRef}
        >
          <div className="profile-details d-flex align-items-center">
            {/* <div className="admin-img">
                            <img src="/images/person-2.png" alt="User" className='ProfileMenu-img rounded-circle' />
                        </div> */}
            <div className="ProfileMenu-img rounded-circle">A</div>
            <div className="ps-3">
              <div className="fw-bold text-sm" style={{ lineHeight: 1 }}>
                Admin
              </div>
              <div
                className="text-xs text-slate-500 mt-1"
                style={{ lineHeight: 1 }}
              >
                Admin@gmail.com
              </div>
              <div
                className="text-xs text-slate-500 mt-1"
                style={{ lineHeight: 1 }}
              >
                Role : Admin
              </div>
            </div>
          </div>

          <hr className="my-0" />

          <div>
            <Link
              className="profile-menu"
              to="/profile"
              onClick={() => setIsProfile(false)}
            >
              <BiUser className="text-slate-700" />
              <div className="ms-2">Profile</div>
            </Link>
            <div className="profile-menu" onClick={() => navigate("/")}>
              <BiLogOutCircle className="text-danger" />
              <div className="ms-2 text-danger">Log Out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
