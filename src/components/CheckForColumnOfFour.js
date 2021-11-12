const CheckForColumnOfFour = ({
  currentColorArrangement,
  lastColumn,
  width,
  blank,
  setScoreDisplay,
}) => {
  for (let i = 0; i <= lastColumn(3); i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === blank;

    if (
      columnOfFour.every(
        (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
      )
    ) {
      setScoreDisplay((score) => score + 4);
      columnOfFour.forEach((candy) => (currentColorArrangement[candy] = blank));
      return true;
    }
  }
};

export default CheckForColumnOfFour;
