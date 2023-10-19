import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center w-full min-h-100vh h-full">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
