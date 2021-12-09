import { useState } from "react";
import Box from "./Box";

const colors = [
  "rgb(249, 206, 43)",
  "rgb(241, 154, 50)",
  "rgb(236, 84, 81)",
  "rgb(113, 181, 82)",
  "rgb(203, 237, 239)",
  "rgb(133, 217, 225)",
  "rgb(42, 172, 184)",
  "rgb(194, 53, 223)",
];

export default function ListContainer() {
  // const [order, setOrder] = useState(colors.map((_, idx) => idx));
  const [order, setOrder] = useState([6, 1, 3, 2, 0, 7, 4, 5]);
  const [orgPos, setOrgPos] = useState(0);
  const [draggingNode, setDraggingNode] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const [moved, setMoved] = useState(0);
  const [recent, setRecent] = useState(null);

  const handleTransitionUp = (whole, decimal) => {
    if (recent === whole || orgPos === order.length - 1) return;

    if (decimal > 0.45) {
      const newOrder = [...order];
      const idx = order.findIndex((ele) => ele === draggingNode);
      console.log(decimal);
      [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
      setOrder(newOrder);

      setRecent(whole);
    }
  };

  const handleTransitionDown = (whole, decimal) => {
    console.log("Down");
  };

  const handleMouseDown = (e) => {
    const activeElement = parseInt(e.target.dataset.uid);

    setMouseY(e.clientY);
    setDraggingNode(activeElement);
    setOrgPos(order.findIndex((ele) => ele === activeElement));
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
    setIsMouseDown(false);
    setMoved(0);
    setRecent(null);
    setOrgPos(0);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;

    const currentMoved = Math.floor(e.clientY - mouseY);
    const ratio = moved / 70;

    let decimal, whole;

    if (ratio > 0) {
      whole = Math.floor(ratio);
      decimal = ratio - whole;
    }

    if (currentMoved > moved) {
      handleTransitionUp(whole, decimal);
    } else if (currentMoved < moved) {
      handleTransitionDown(decimal);
    }

    setMoved(currentMoved);
  };

  const dragNdrop = {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  };

  return (
    <div className="ListContainer">
      {colors.map((color, index) => {
        const idx = order.findIndex((ele) => ele === index);
        const uid = order[idx];
        const isActive = draggingNode === null ? false : draggingNode === uid;

        return (
          <Box
            dragNdrop={dragNdrop}
            bgColor={color}
            key={color}
            index={idx}
            uid={uid}
            translateY={isActive ? orgPos : idx}
            isActive={isActive}
            movedY={moved}
          />
        );
      })}
    </div>
  );
}
