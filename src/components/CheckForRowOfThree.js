const CheckForRowOfThree = ({
  currentColorArrangement,
  area,
  width,
  blank,
  setScoreDisplay,
}) => {
  for (let i = 0; i <= area; i++) {
    const rowOfThree = [i, i + 1, i + 2];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === blank;

    const notValid = () => {
      const columns = [];
      for (let i = width; i > 0; i--) {
        if (i === width) {
          columns.push(width * i, width * i - 1);
        } else {
          columns.push(width * i - 1, width * i - 2);
        }
      }
      return columns;
    };

    if (notValid().includes(i)) continue;

    if (
      rowOfThree.every(
        (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
      )
    ) {
      setScoreDisplay((score) => score + 3);
      rowOfThree.forEach((candy) => (currentColorArrangement[candy] = blank));
      return true;
    }
  }
};

export default CheckForRowOfThree;
