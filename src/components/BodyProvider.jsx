"use client";

import React, { createContext, useEffect, useRef, useState } from "react";

export const FullScreenContext = createContext(null);
import dynamic from "next/dynamic";
const InstallPrompt = dynamic(
  () => import("@/components/beforeinstallprompt"),
  {
    ssr: false,
  }
);

const BodyProvider = ({ children, className }) => {
  const [fullscreen, setIsFullscreen] = useState(false);
  const bodyRef = useRef(null);

  const toggleFullscreen = (fullscreen) => {
    if (!bodyRef.current) return;
    const element = bodyRef.current;

    const enterFullscreen = () => {
      if (element?.requestFullscreen) {
        element.requestFullscreen?.();
      } else if (element?.webkitRequestFullscreen) {
        element?.webkitRequestFullscreen?.();
      } else if (element?.msRequestFullscreen) {
        element?.msRequestFullscreen?.();
      } else {
        // Fallback manual fullscreen styling
        element.style.transform = "scale(1)";
        element.style.width = "100vw";
        element.style.height = "100vh";
        element.style.position = "fixed";
        element.style.top = "0";
        element.style.left = "0";
        element.style.zIndex = "9999";
        element.style.backgroundColor = "#000";
        document.body.style.overflow = "hidden";
      }
      setIsFullscreen(true);
    };

    const exitFullscreen = () => {
      if (document?.exitFullscreen) {
        document?.exitFullscreen?.();
      } else if (document.webkitExitFullscreen) {
        document?.webkitExitFullscreen?.();
      } else {
        // Remove fallback fullscreen styles
        element.style.transform = "";
        element.style.width = "";
        element.style.height = "";
        element.style.position = "";
        element.style.top = "";
        element.style.left = "";
        element.style.zIndex = "";
        element.style.backgroundColor = "";
        // document.body.style.overflow = '';
      }
      setIsFullscreen(false);
    };
    if (fullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [bodyRef?.current]);
  return (
    <body className={className}>
      <div ref={bodyRef}>
        <FullScreenContext.Provider value={{ fullscreen, toggleFullscreen }}>
          {children}
          <button
            onClick={() => {
              toggleFullscreen(fullscreen);
            }}
          >
            Full Screen
          </button>
          <p>fullscreen:{fullscreen}</p>
        </FullScreenContext.Provider>
      </div>
      <InstallPrompt />
    </body>
  );
};

export default BodyProvider;
