// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * ---------------------
 * 1. Page load ya refresh par top pe scroll kare
 * 2. Route change hone par top pe scroll kare
 * 3. Optional: Smooth scroll
 */
const ScrollToTop: React.FC<{ smooth?: boolean }> = ({ smooth = false }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }, [pathname, smooth]); // route change ya smooth prop change hone par

  return null;
};

export default ScrollToTop;
