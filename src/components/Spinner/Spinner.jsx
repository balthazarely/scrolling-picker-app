import React from "react";
import { SpinnerBox } from "./SpinnerBox";

const spinnerDimensions = {
  width: "250px",
  height: "450px",
  border: "1px solid teal",
};

export const Spinner = ({ staticNameArray, currentName }) => {
  return (
    <div style={spinnerDimensions}>
      {staticNameArray.map((name, i) => (
        <SpinnerBox key={name} name={name} currentName={currentName} />
      ))}
    </div>
  );
};
