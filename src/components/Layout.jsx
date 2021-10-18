import React from "react";

export const Layout = ({ children }) => {
  return (
    <div className=" bg-gray-800 w-full h-screen">
      <div className="container mx-auto px-4 pt-44 ">{children}</div>
    </div>
  );
};
