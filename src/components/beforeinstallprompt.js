"use client";
import { useEffect } from "react";

const InstallPrompt = () => {
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log("🔥 beforeinstallprompt fired!", event);
      event.preventDefault(); // Prevent default behavior

      // Auto-show install prompt after 2 seconds
      setTimeout(() => {
        console.log("🚀 Trying to open install prompt...");
        event.prompt();
        event.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("✅ User accepted the install");
          } else {
            console.log("❌ User dismissed the install");
          }
        });
      }, 2000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return null;
};

export default InstallPrompt;
