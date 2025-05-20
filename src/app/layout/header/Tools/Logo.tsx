import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import logo images
import MainLogo from "../../../assests/images/confirmation.png";
import LogoWhite from "../../../assests/images/confirmation.png";
import MobileLogo from "../../../assests/images/confirmation.png";
import MobileLogoWhite from "../../../assests/images/confirmation.png";

const Logo: React.FC = () => {
  // Dark mode toggle (you may replace with context or redux logic)
  const [isDark, setIsDark] = useState(false);

  // Listen to prefers-color-scheme or replace with your own logic
  useEffect(() => {
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
    const updateMode = () => setIsDark(matchDark.matches);
    updateMode();
    matchDark.addEventListener("change", updateMode);
    return () => matchDark.removeEventListener("change", updateMode);
  }, []);

  // Window width tracking
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoints = {
    xl: 1200,
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex align-items-center">
      <Link to="/dashboard" className="text-decoration-none">
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="Main Logo" className="img-fluid" />
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt="Mobile Logo" className="img-fluid" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
