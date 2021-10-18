import React from "react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { getRandomInt } from "../../utls";
import { Spinner } from "./Spinner";
import { SpinnerBtn } from "./SpinnerBtn";
import { getAllPeople } from "../../api/People";

export const SpinnerWrapper = () => {
  const [staticNameArray, setStaticNameArray] = useState([]);
  const [nameArray, setNameArray] = useState([]);

  const [rotations, setRotations] = useState(2);
  const [speed, setSpeed] = useState(0);
  const [currentName, setCurrentName] = useState();
  const [gameOver, setGameOver] = useState(false);
  let moveDistance;

  // Game Logic
  const pickRandomName = () => {
    let randomInt = getRandomInt(nameArray.length);
    let selectedName = nameArray[randomInt];
    setNameArray(nameArray.filter((name) => name !== selectedName));
    // Static Array Operations
    let currentNamePosition = staticNameArray.indexOf(currentName);
    let selectedNamePosition = staticNameArray.indexOf(selectedName);
    console.log("current", currentName, "selected", selectedName);
    console.log("current Names position in array", currentNamePosition);
    console.log("selected Names position in array", selectedNamePosition);
    let distanceToTravel = currentNamePosition - selectedNamePosition;

    if (distanceToTravel === 0) {
      moveDistance = staticNameArray.length * 50 * rotations;
    }

    if (distanceToTravel < 0) {
      moveDistance = Math.abs(
        (distanceToTravel + staticNameArray.length) * 50 +
          staticNameArray.length * 50 * rotations
      );
    }
    if (distanceToTravel > 0) {
      moveDistance = Math.abs(
        distanceToTravel * 50 + staticNameArray.length * 50 * rotations
      );
    }

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
      pickRandomName();
      gsap.to(".box", speed, {
        ease: "power4.inOut",
        y: `+=${moveDistance}`,
        modifiers: {
          y: (y) => (parseFloat(y) % (staticNameArray.length * 50)) + "px",
        },
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

  return (
    <>
      <div className="spin__page__wrapper flex md:flex-row flex-col ">
        <div className="flex-1 border-4 border-purple-500 w-full h-full flex flex-col items-center justify-center ">
          <SpinnerBtn nextButtonClick={nextButtonClick} />
          <Spinner staticNameArray={staticNameArray} />
        </div>

        <div className="text-5xl flex-1 text-white font-extrabold text-center border-red-200 border-2">
          {currentName}
        </div>
        <div className="text-lg text-white font-bold">Remaining</div>
        {nameArray.map((name) => (
          <div className="text-sm text-white font-base" key={name}>
            {name}
          </div>
        ))}
      </div>
    </>
  );
};
