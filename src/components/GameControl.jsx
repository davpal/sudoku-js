import React from "react";

const GameControl = ({ onNumberSelect, selectedNumber }) => {
  const numButtons = new Array(9).fill(0).map((_, i) => {
    return <button key={i} onClick={() => onNumberSelect(i + 1)}
                   className={selectedNumber == i + 1 ? 'selected-number' : ''}>{i + 1}</button>;
  });

  console.log(numButtons);
  
  return <div className="game-control__numbers">{numButtons}</div>;
};

export default GameControl;