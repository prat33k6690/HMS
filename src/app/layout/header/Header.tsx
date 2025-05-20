import { useState, useRef, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { BiMenu, BiChevronDown } from "react-icons/bi";
import productLogo from "../../assests/images/login/logo_api.png";


type headerProps = {
  setIsMenuBar: any
}
const Header = ({ setIsMenuBar }: headerProps) => {
  // const notificationData = useSelector((state: any) => state.notification.notificationData)?.filter((data: any) => data.ReadStatus === "N");
  const [isProfile, setIsProfile] = useState(false);
  const profileRef: any = useRef(null);
  const profileIconRef: any = useRef(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const notificationRef: any = useRef<any>(null);
  const notificationIconRef: any = useRef<any>(null);
  useEffect(() => {
    const closeNotificationSection = (event: MouseEvent) => {
      if (
        !notificationRef?.current?.contains(event.target) &&
        !notificationIconRef?.current?.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", closeNotificationSection);
  }, [notificationRef]);

  const profileMenuIconRef: any = useRef<any>(null);
  // const isLanguage = useSelector((state: any) => state.layout.isLanguage);
  // const languageRef: any = useRef<undefined>();
  // const languageIconRef: any = useRef<undefined>();

  // useEffect(() => {
  //   const closeLanguageSection = (event: MouseEvent) => {
  //     if (
  //       !languageRef?.current?.contains(event.target) &&
  //       !languageIconRef?.current?.contains(event.target)
  //     ) {
  //       dispatch(handleLanguage(false))
  //     }
  //   };
  //   document.addEventListener("mousedown", closeLanguageSection);
  // }, [languageRef]);




  // const [isProfileMenu, setIsProfileMenu] = useState<boolean>(false);
  // const profileMenuRef: any = useRef<any>(null);

  // useEffect(() => {
  //   const closeProfileMenu = (event: MouseEvent) => {
  //     if (
  //       !profileMenuRef?.current?.contains(event.target) &&
  //       !profileMenuIconRef?.current?.contains(event.target)
  //     ) {
  //       setIsProfileMenu(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", closeProfileMenu);
  // }, [profileMenuRef]);


  useEffect(() => {
    const closeProfileSection = (event: any) => {
      if (
        !profileRef?.current?.contains(event.target) &&
        !profileIconRef?.current?.contains(event.target)
      ) {
        setIsProfile(false);
      }
    };
    document.addEventListener("mousedown", closeProfileSection);
  }, [profileRef]);

  const isDark = useSelector((state: any) => state.layout.isDark);
  const screenWidth = useSelector((state: any) => state.layout.currentScreenWidth);
  const bankLogo = useSelector((state: any) => state.layout.bankLogo);
  const dispatch = useDispatch();

  return (
    <>
    
      <Navbar

        className="border-bottom w-100 bg-white justify-content-end position-sticky top-0"
        style={{ borderColor: 'rgb(203 213 225)', zIndex: 999 }}
      >
        <div className="ml-auto d-flex align-items-center">
          {/* <div
              className="header-icon mx-2 rounded-circle position-relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              ref={notificationIconRef}
            >
              <BiBell />
              {notificationData !== null && notificationData?.length !== 0 && notificationData?.length !== undefined &&
                <div className="bg-orange rounded-circle position-absolute text-xs d-flex justify-content-center align-items-center text-white" style={{ width: 15, height: 15, top: 0, right: 0 }}>{notificationData?.length}</div>
              }
            </div> */}
          <div
            onClick={() => setIsProfile(!isProfile)}
            ref={profileMenuIconRef}
            style={{ cursor: "pointer" }}
            className="profile-icon d-flex align-items-center gap-2 pe-3"
          >
            {/* {userProfile === null || userProfile === "" ? ( */}
            {/* <Image src='/imgaes/profile.png' alt="User" roundedCircle style={{ width: 40, aspectRatio: "2/2" }} /> */}
            <div className="ProfileHeader-icon rounded-circle">Y</div>
            <div className="">
              <div className="text-sm fw-semibold">Admin</div>
              <div className="d-flex align-items-center gap-1">
                <div className="status-indicate" style={{ backgroundColor: "#36B37E" }}></div>
              </div>
            </div>
            {/* // ) : <Image src={userProfile !== null ? userProfile : userData?.Photo} alt={userData?.FirstName} roundedCircle style={{ width: 40, aspectRatio: "2/2" }} />} */}
            <BiChevronDown />
          </div>
        </div>
      </Navbar>

      {/* {isNotificationOpen && (<Notification notificationRef={notificationRef} isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} />)} */}
      {/* {isProfileMenu && (<Profile profileMenuRef={profileMenuRef} isProfileMenu={isProfileMenu} setIsProfileMenu={setIsProfileMenu} userProfile={userProfile} />)} */}
      {isProfile && (
        <Profile
          isProfile={isProfile}
          profileRef={profileRef}
          screenWidth={screenWidth}
          setIsProfile={setIsProfile}
        />
      )}
    </>
  );
};

export default Header;
