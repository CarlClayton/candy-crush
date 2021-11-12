const MoveIntoSpace = ({
  currentColorArrangement,
  randomColor,
  area,
  width,
  blank,
}) => {
  for (let i = 0; i <= area - width - 1; i++) {
    const firstRow = () => {
      const arr = [];
      for (let i = 0; i <= width; i++) {
        arr.push(i);
      }
      return arr;
    };
    const isFirstRow = firstRow().includes(i);

    if (isFirstRow && currentColorArrangement[i] === blank) {
      currentColorArrangement[i] = randomColor();
    }
    if (currentColorArrangement[i + width] === blank) {
      currentColorArrangement[i + width] = currentColorArrangement[i];
      currentColorArrangement[i] = blank;
    }
  }
};

export default MoveIntoSpace;
