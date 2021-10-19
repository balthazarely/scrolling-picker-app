import React from "react";
import { SpinnerBtn } from "./Spinner/SpinnerBtn";

export const InfoPannel = ({
  isSpinning,
  gameActive,
  currentName,
  nextButtonClick,
  whoHasGoneArray,
  nameArray,
}) => {
  return (
    <div className="text-5xl flex-1 text-white font-extrabold text-center ">
      <div className="current__name__wrapper h-24  flex items-center justify-center">
        {!isSpinning && gameActive && (
          <div className="current__name">{currentName}</div>
        )}
      </div>
      <div className="flex justify-center">
        <SpinnerBtn nextButtonClick={nextButtonClick} />
      </div>
      <div className="mt-10">
        <div className="text-lg text-white">
          is game active:{" "}
          <span className="text-yellow-400">
            {gameActive ? "True" : "False"}
          </span>
        </div>
        <div className="text-lg text-white">
          is spinning:{" "}
          <span className="text-yellow-400">
            {isSpinning ? "True" : "False"}
          </span>
        </div>

        <div className="text-lg text-white">
          remaining people:{" "}
          <span className="text-yellow-400">{nameArray.length}</span>
        </div>
        <div className="text-lg text-white font-black mt-5">Who Has Gone</div>
        {whoHasGoneArray.map((name) => (
          <div className="text-sm text-yellow-400" key={name}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
