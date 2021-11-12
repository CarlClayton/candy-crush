const CheckForRowOfFour = ({
  currentColorArrangement,
  width,
  area,
  blank,
  setScoreDisplay,
}) => {
  for (let i = 0; i <= area; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === blank;

    const notValid = () => {
      const columns = [];
      for (let i = width; i > 0; i--) {
        if (i === width) {
          columns.push(width * i, width * i - 1, width * i - 2);
        } else {
          columns.push(width * i - 1, width * i - 2, width * i - 3);
        }
      }
      return columns;
    };

    if (notValid().includes(i)) continue;

    if (
      rowOfFour.every(
        (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
      )
    ) {
      setScoreDisplay((score) => score + 4);
      rowOfFour.forEach((candy) => (currentColorArrangement[candy] = blank));
      return true;
    }
  }
};

export default CheckForRowOfFour;
