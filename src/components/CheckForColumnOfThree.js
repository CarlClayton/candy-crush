const CheckForColumnOfThree = ({
  currentColorArrangement,
  width,
  lastColumn,
  blank,
  setScoreDisplay,
}) => {
  for (let i = 0; i <= lastColumn(2); i++) {
    const columnOfThree = [i, i + width, i + width * 2];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === blank;

    if (
      columnOfThree.every(
        (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
      )
    ) {
      setScoreDisplay((score) => score + 3);
      columnOfThree.forEach(
        (candy) => (currentColorArrangement[candy] = blank)
      );
      return true;
    }
  }
};

export default CheckForColumnOfThree;
