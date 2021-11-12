import { useContext, useEffect } from "react";
import { CandyContext } from "./CandyContext";
import Candy from "./Candy";
import CheckForColumnOfFour from "./CheckForColumnOfFour";
import CheckForRowOfFour from "./CheckForRowOfFour";
import CheckForColumnOfThree from "./CheckForColumnOfThree";
import CheckForRowOfThree from "./CheckForRowOfThree";
import MoveIntoSpace from "./MoveIntoSpace";

const Game = () => {
  const candyContext = useContext(CandyContext);
  const {
    currentColorArrangement,
    setCurrentColorArrangement,
    randomColor,
    area,
    width,
    blank,
    lastColumn,
    setScoreDisplay,
    // scoreDisplay,
  } = candyContext;

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < area; i++) {
      randomColorArrangement.push(randomColor());
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      CheckForColumnOfFour(
        currentColorArrangement,
        lastColumn,
        width,
        blank,
        setScoreDisplay
      );
      CheckForRowOfFour(
        currentColorArrangement,
        width,
        area,
        blank,
        setScoreDisplay
      );
      CheckForColumnOfThree(
        currentColorArrangement,
        width,
        lastColumn,
        blank,
        setScoreDisplay
      );
      CheckForRowOfThree(
        currentColorArrangement,
        area,
        width,
        blank,
        setScoreDisplay
      );
      MoveIntoSpace(currentColorArrangement, randomColor, area, width, blank);
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    currentColorArrangement,
    setCurrentColorArrangement,
    randomColor,
    area,
    width,
    blank,
    lastColumn,
    setScoreDisplay,
  ]);

  return (
    <div className="game">
      {currentColorArrangement.map((candyColor, index) => (
        <Candy candyColor={candyColor} index={index} />
      ))}
    </div>
  );
};

export default Game;
