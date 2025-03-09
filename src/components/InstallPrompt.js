"use client";
import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event); // Save the event for later
      setShowInstallButton(true); // Show install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("🔥 beforeinstallprompt event fired!");
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install");
        } else {
          console.log("User dismissed the install");
        }
        setDeferredPrompt(null); // Reset prompt
        setShowInstallButton(false); // Hide button after interaction
      });
    }
  };

  return (
    <>
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Install App
        </button>
      )}
    </>
  );
};

export default InstallPrompt;
