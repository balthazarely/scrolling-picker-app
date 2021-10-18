import React from "react";

export const SpinnerBtn = ({ nextButtonClick }) => {
  return (
    <div
      onClick={nextButtonClick}
      style={{ width: "250px" }}
      className=" bg-blue-500 text-white px-4 py-2 text-center cursor-pointer "
    >
      Spin
    </div>
  );
};
