import React from "react";

const Loader = ({ size = "20px", color = "border-white" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-r-amber-100 border-t-transparent ${color}`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Loader;
