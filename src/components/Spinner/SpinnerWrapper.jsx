import React from "react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  calcMultiplier,
  calculateSpinnerDistance,
  duplicateArr,
  getRandomInt,
} from "../../utls";
import { Spinner } from "./Spinner";
import { InfoPannel } from "../InfoPannel";
import { getAllPeople } from "../../api/People";

export const SpinnerWrapper = () => {
  const [staticNameArray, setStaticNameArray] = useState([]);
  const [nameArray, setNameArray] = useState([]);
  const [whoHasGoneArray, setWhoHasGoneArray] = useState([]);

  // Game Variables
  const [rotations, setRotations] = useState(30);
  const [duration, setDuration] = useState(2);
  const [currentName, setCurrentName] = useState();
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  let moveDistance;
  let selectedName;

  // Game Logic
  const pickRandomName = () => {
    let randomInt = getRandomInt(nameArray.length);
    selectedName = nameArray[randomInt];

    setNameArray(nameArray.filter((name) => name !== selectedName));
    moveDistance = calculateSpinnerDistance(
      currentName,
      selectedName,
      rotations,
      staticNameArray
    );
    setCurrentName(selectedName);
  };

  const addNameToCompleted = () => {
    setWhoHasGoneArray([...whoHasGoneArray, selectedName]);
  };

  const checkIfCompleted = () => {
    if (nameArray.length === 1) {
      setGameOver(true);
    }
  };

  const nextButtonClick = () => {
    console.log(nameArray, staticNameArray);
    if (!gameOver && !gsap.isTweening(".box")) {
      setGameActive(true);
      checkIfCompleted();
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
        addNameToCompleted();
      });
    }
    if (gameOver) {
      setCurrentName("GAME OVER");
    }
  };

  async function getPeople() {
    let response = getAllPeople();
    let data = await response;
    let people = await data.data
      .filter((person) => person.isEnabled)
      .map((person) => person.name);
    let peopleMultiplied = duplicateArr(people);
    setNameArray(people);
    setStaticNameArray(peopleMultiplied);
    setCurrentName(peopleMultiplied[5]);
  }

  const resetGame = () => {
    setGameOver(false);
    getPeople();
    setWhoHasGoneArray([]);
  };

  useEffect(() => {
    getPeople();
  }, []);

  useEffect(() => {
    gsap.set(".box", {
      y: (i) => i * 50,
    });
  }, [staticNameArray]);

  const spinnerDimensions = {
    height: "450px",
    border: "1px solid teal",
  };

  return (
    <>
      <div className=" md:flex-row flex-col flex ">
        <div
          className="flex-1 w-full h-full flex flex-col items-center justify-center  overflow-hidden relative"
          style={spinnerDimensions}
        >
          <Spinner
            staticNameArray={staticNameArray}
            currentName={currentName}
          />
        </div>
        <button onClick={() => resetGame()}>reset</button>
        <InfoPannel
          isSpinning={isSpinning}
          gameActive={gameActive}
          nextButtonClick={nextButtonClick}
          currentName={currentName}
          nameArray={nameArray}
          whoHasGoneArray={whoHasGoneArray}
        />
      </div>
    </>
  );
};
