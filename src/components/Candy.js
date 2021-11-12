import { useContext, useState } from "react";
import { CandyContext } from "./CandyContext";
import CheckForColumnOfFour from "./CheckForColumnOfFour";
import CheckForRowOfFour from "./CheckForRowOfFour";
import CheckForColumnOfThree from "./CheckForColumnOfThree";
import CheckForRowOfThree from "./CheckForRowOfThree";

const Candy = ({ index, candyColor }) => {
  const [candyBeingDragged, setCandyBeingDragged] = useState(null);
  const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);
  const candyContext = useContext(CandyContext);
  const { currentColorArrangement, setCurrentColorArrangement, width } =
    candyContext;

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

    const isAColumnOfFour = CheckForColumnOfFour();
    const isARowOfFour = CheckForRowOfFour();
    const isAColumnOfThree = CheckForColumnOfThree();
    const isARowOfThree = CheckForRowOfThree();

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

  return (
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
  );
};

export default Candy;
