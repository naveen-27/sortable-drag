export default function Box(props) {
  const { handleMouseDown, handleMouseMove, handleMouseUp } = props.dragNdrop;
  const { movedY, uid, index, translateY, bgColor, isActive } = props;

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      data-idx={index}
      data-uid={uid}
      className={`Box${isActive ? " Dragging" : ""}`}
      style={{
        backgroundColor: bgColor,
        "--movedY": `${isActive ? movedY : 0}px`,
        "--translateY": `${translateY * 100}%`,
      }}
    ></div>
  );
}
