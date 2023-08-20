import React from "react";

const Dice = ({ isHeld, value, holdDice }) => {
  const styles = {
    background: isHeld ? "#59E391" : "white",
  };

  return (
    <div className="dice" style={styles} onClick={holdDice}>
      <h2 className="dice-num">{value}</h2>
    </div>
  );
};

export default Dice;
