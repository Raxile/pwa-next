"use client";
import { useEffect, useState } from "react";

const InstallPrompt = () => {
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log("call handleBeforeInstallPrompt");
      event.prompt(); // Automatically show install prompt

      event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install");
        } else {
          console.log("User dismissed the install");
        }
      });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return null; // No need for a button since prompt opens automatically
};

export default InstallPrompt;
