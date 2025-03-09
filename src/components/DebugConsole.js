"use client";
import { useEffect, useState } from "react";

const DebugConsole = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const logHandler = (msg) => {
      setLogs((prevLogs) => [...prevLogs, msg]);
    };

    console.log = logHandler; // Override console.log
    console.warn = logHandler;
    console.error = logHandler;
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        maxHeight: "200px",
        overflowY: "scroll",
        background: "black",
        color: "lime",
        padding: "10px",
        fontSize: "12px",
      }}
    >
      {logs.map((log, i) => (
        <p key={i}>{log}</p>
      ))}
    </div>
  );
};

export default DebugConsole;
