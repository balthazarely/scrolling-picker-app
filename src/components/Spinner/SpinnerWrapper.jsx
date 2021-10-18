import React from "react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { calculateSpinnerDistance, getRandomInt } from "../../utls";
import { Spinner } from "./Spinner";
import { SpinnerBtn } from "./SpinnerBtn";

export const SpinnerWrapper = () => {
  const [staticNameArray, setStaticNameArray] = useState([]);
  const [nameArray, setNameArray] = useState([]);
  const [whoHasGoneArray, setWhoHasGoneArray] = useState([]);

  // Game Variables
  let moveDistance;
  const [rotations, setRotations] = useState(10);
  const [duration, setDuration] = useState(0.5);
  const [currentName, setCurrentName] = useState();
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Game Logic
  const pickRandomName = () => {
    let randomInt = getRandomInt(nameArray.length);
    let selectedName = nameArray[randomInt];
    setWhoHasGoneArray([...whoHasGoneArray, selectedName]);
    setNameArray(nameArray.filter((name) => name !== selectedName));
    moveDistance = calculateSpinnerDistance(
      currentName,
      selectedName,
      rotations,
      staticNameArray
    );
    setCurrentName(selectedName);
  };

  const checkIfCompleted = () => {
    if (nameArray.length === 1) {
      setGameOver(true);
      console.log("game over");
    }
  };

  const nextButtonClick = () => {
    if (!gameOver && !gsap.isTweening(".box")) {
      checkIfCompleted();
      setGameActive(true);
      pickRandomName();
      setIsSpinning(true);
      const tl = gsap.timeline();
      tl.to(".box", duration, {
        ease: "power4.inOut",
        y: `+=${moveDistance}`,
        modifiers: {
          y: (y) => (parseFloat(y) % (staticNameArray.length * 50)) + "px",
        },
      }).call(() => {
        setIsSpinning(false);
      });
    }
  };

  useEffect(() => {
    async function getPeople() {
      let response = await fetch(
        "http://wheelofstandup-api-dev.azurewebsites.net/People"
      );
      let data = await response.json();
      let names = await data
        .filter((person) => person.isEnabled)
        .map((person) => person.name);

      console.log(names);
      setNameArray(names);
      setStaticNameArray(names);
      setCurrentName(names[4]);
    }
    getPeople();
  }, []);

  useEffect(() => {
    gsap.set(".box", {
      y: (i) => i * 50,
    });
  }, [staticNameArray]);

  const spinnerDimensions = {
    height: "500px",
    border: "12px solid teal",
    overflow: "hidden,",
    // width: "200px",
  };

  return (
    <>
      <div className=" md:flex-row flex-col flex ">
        <div
          className="flex-1 border-4 border-purple-500 w-full h-full flex flex-col items-center justify-center overflow-hidden relative"
          style={spinnerDimensions}
        >
          <SpinnerBtn nextButtonClick={nextButtonClick} />
          <Spinner
            staticNameArray={staticNameArray}
            currentName={currentName}
          />
        </div>

        <div className="text-5xl flex-1 text-white font-extrabold text-center border-red-200 border-2">
          <div className="current__name__wrapper h-24 border-2 border-white flex items-center justify-center">
            {!isSpinning && gameActive && (
              <div className="current__name">{currentName}</div>
            )}
          </div>
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
    </>
  );
};
