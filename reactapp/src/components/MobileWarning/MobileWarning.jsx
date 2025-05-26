import React, { useEffect, useState, useRef } from "react";
import MobileBlockDialog from "./MobileBlockDialog";

function MobileWarning() {
  const [showMobileBlock, setShowMobileBlock] = useState(false);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const isMobileDevice = () => {
      // Check for mobile device using multiple methods
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "mobile",
        "android",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "opera mini",
      ];

      // Check user agent
      const isMobileUserAgent = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );

      // Check screen width (typical mobile breakpoint)
      const isMobileScreen = window.innerWidth <= 768;

      // Check for touch capability
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

      return isMobileUserAgent || (isMobileScreen && isTouchDevice);
    };

    const checkMobileAndBlock = () => {
      if (isMobileDevice()) {
        setShowMobileBlock(true);
      } else {
        setShowMobileBlock(false);
      }
    };

    // Check immediately on mount
    checkMobileAndBlock();

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        checkMobileAndBlock();
      }, 300); // 300ms debounce
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return <MobileBlockDialog open={showMobileBlock} />;
}

export default MobileWarning;
