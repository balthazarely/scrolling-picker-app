export const getRandomInt = (max) => {
  let random = Math.floor(Math.random() * max);
  return random;
};

export const calculateSpinnerDistance = (
  currentName,
  selectedName,
  rotations,
  staticNameArray
) => {
  let currentNamePosition = staticNameArray.indexOf(currentName);
  let selectedNamePosition = staticNameArray.indexOf(selectedName);
  let distanceToTravel = currentNamePosition - selectedNamePosition;
  if (distanceToTravel === 0) {
    return staticNameArray.length * 50 * rotations;
  }
  if (distanceToTravel < 0) {
    return Math.abs(
      (distanceToTravel + staticNameArray.length) * 50 +
        staticNameArray.length * 50 * rotations
    );
  }
  if (distanceToTravel > 0) {
    return Math.abs(
      distanceToTravel * 50 + staticNameArray.length * 50 * rotations
    );
  }
};
