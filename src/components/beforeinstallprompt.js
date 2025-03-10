"use client";
import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [installEvent, setInstallEvent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log("call handleBeforeInstallPrompt");
      event.preventDefault(); // Prevent auto prompt
      setInstallEvent(event);
      setShowBanner(true); // Show banner automatically
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installEvent) {
      installEvent.prompt();
      installEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install");
        } else {
          console.log("User dismissed the install");
        }
      });
      setShowBanner(false);
    }
  };

  const handleCancelClick = () => {
    setShowBanner(false); // Hide banner when user cancels
  };

  return (
    <>
      {showBanner && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "lightgray",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <p>Install this app?</p>
          <button onClick={handleInstallClick}>Install</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default InstallPrompt;
