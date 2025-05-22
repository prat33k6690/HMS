import { useState, useRef, useEffect } from "react";
import { Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { BiMenu, BiChevronDown, BiMenuAltLeft } from "react-icons/bi";
import SearchBar from "../../component/ui/SearchBar/SearchBar";
import { MdOutlineDarkMode } from "react-icons/md";
import { RiFullscreenFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";


type headerProps = {
  setIsMenuBar: any
  collapsed: boolean;
  toggleSidebar: () => void;
  width: number;
}
const Header = ({ toggleSidebar, width }: headerProps) => {

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


  const screenWidth = useSelector((state: any) => state.layout.currentScreenWidth);

  // full screen function
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'F11') {
        event.preventDefault();
        handleFullscreenToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFullscreenToggle = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  //end


  return (
    <>
      <Navbar
        className="border-bottom w-100 bg-white justify-content-end position-sticky top-0"
        style={{ borderColor: 'rgb(203 213 225)', zIndex: 999 }}
      >
        {width <= 768 && (
          <div onClick={toggleSidebar} className="cursor-pointer text-2xl">
            <BiMenuAltLeft />
          </div>
        )}
        <div className="ml-auto d-flex gap-3 align-items-center">

          <SearchBar />
          <div>
            <MdOutlineDarkMode size={20} />
          </div>
          <RiFullscreenFill size={30} onClick={handleFullscreenToggle} style={{ cursor: "pointer" }} />

          <div
            onClick={() => setIsProfile(!isProfile)}
            ref={profileMenuIconRef}
            style={{ cursor: "pointer" }}
            className="profile-icon  d-flex align-items-center gap-2 pe-3"
          >

            <div style={{ fontSize: "10px", width: '120px' }} className="d-flex gap-2   align-items-center profile-media"><div className="ProfileHeader-icon rounded-circle"><img src="https://admin.pixelstrap.net/miami/assets/images/dashboard/profile.png" alt="" /></div>
              <div className="flex-grow-1"><span>Ava Davis</span>
                <p className="mb-0">Web Designer</p>
              </div>
            </div>

            <BiChevronDown />
          </div>
        </div>
      </Navbar>


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
