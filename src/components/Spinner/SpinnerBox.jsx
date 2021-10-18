import React from "react";

const boxDimensions = {
  width: "250px",
  height: "50px",
  border: "1px solid teal",
};

export const SpinnerBox = ({ name, currentName }) => {
  return (
    <div
      className={`box absolute z-10  text-white text-xl flex items-center justify-center ${
        currentName === name ? "bg-transparent" : "bg-transparent"
      }`}
      style={boxDimensions}
    >
      {name}
    </div>
  );
};
