import { useEffect, useState } from "react";
import Scoreboard from "./components/Scoreboard";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blank from "./images/blank.png";

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

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [candyBeingDragged, setCandyBeingDragged] = useState(null);
  const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = () => {
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
        columnOfFour.forEach(
          (candy) => (currentColorArrangement[candy] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
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

  const checkForColumnOfThree = () => {
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

  const checkForRowOfThree = () => {
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

  const moveIntoSpaceBelow = () => {
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

  const dragStart = (e) => {
    setCandyBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setCandyBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    const candyBeingDraggedId = parseInt(
      candyBeingDragged.getAttribute("data-id")
    );
    const candyBeingReplacedId = parseInt(
      candyBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[candyBeingReplacedId] =
      candyBeingDragged.getAttribute("src");
    currentColorArrangement[candyBeingDraggedId] =
      candyBeingReplaced.getAttribute("src");

    const validMoves = [
      candyBeingDraggedId - 1,
      candyBeingDraggedId - width,
      candyBeingDraggedId + 1,
      candyBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(candyBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      candyBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setCandyBeingDragged(null);
      setCandyBeingReplaced(null);
    } else {
      currentColorArrangement[candyBeingReplacedId] =
        candyBeingReplaced.getAttribute("src");
      currentColorArrangement[candyBeingDraggedId] =
        candyBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

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
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSpaceBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSpaceBelow,
    currentColorArrangement,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            // style={{ backgroundColor: candyColor }}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <Scoreboard score={scoreDisplay} />
    </div>
  );
};

export default App;
