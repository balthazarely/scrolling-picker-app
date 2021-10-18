import React from "react";

const spinnerDimensions = {
  width: "250px",
  height: "450px",
  border: "1px solid teal",
};

const boxDimensions = {
  width: "250px",
  height: "50px",
  border: "1px solid teal",
};

export const Spinner = ({ staticNameArray }) => {
  return (
    <div style={spinnerDimensions} className="wrapper">
      {staticNameArray.map((name, i) => (
        <div
          key={i}
          className="box absolute z-10  text-white text-xl flex items-center justify-center "
          style={boxDimensions}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
