import { createContext, useState } from "react";
import blueCandy from "../images/blue-candy.png";
import greenCandy from "../images/green-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";
import blank from "../images/blank.png";

export const CandyContext = createContext();

export const Provider = ({ children }) => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  // const [candyBeingDragged, setCandyBeingDragged] = useState(null);
  // const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const width = 8;
  const area = width * width;
  const lastColumn = (row) => {
    return area - 1 - width * row;
  };

  const candyColors = [
    redCandy,
    greenCandy,
    yellowCandy,
    blueCandy,
    purpleCandy,
    orangeCandy,
  ];
  const randomColor = () => {
    return candyColors[Math.floor(Math.random() * candyColors.length)];
  };

  const candyContext = {
    currentColorArrangement,
    setCurrentColorArrangement,
    scoreDisplay,
    setScoreDisplay,
    width,
    area,
    lastColumn,
    candyColors,
    randomColor,
    blank,
  };

  return (
    <CandyContext.Provider value={candyContext}>
      {children}
    </CandyContext.Provider>
  );
};

// export const { Consumer } = Context;
