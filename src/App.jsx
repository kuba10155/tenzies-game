import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const TOTAL_DICE = 10;

const generateNewDice = () => ({
  value: Math.ceil(Math.random() * 6),
  isHeld: false,
  id: nanoid(),
});

const App = () => {
  const [diceArray, setDiceArray] = useState(() =>
    Array.from({ length: TOTAL_DICE }, generateNewDice)
  );
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = diceArray.every((dice) => dice.isHeld);
    const firstValue = diceArray[0].value;
    const allSameValue = diceArray.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [diceArray]);

  const rollDice = () => {
    if (!tenzies) {
      setDiceArray((prevDiceArray) =>
        prevDiceArray.map((dice) => (dice.isHeld ? dice : generateNewDice()))
      );
    } else {
      newGame();
    }
  };

  const holdDice = (id) => {
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  };

  const newGame = () => {
    setTenzies(false);
    setDiceArray(Array.from({ length: TOTAL_DICE }, generateNewDice));
  };

  const diceElements = diceArray.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default App;
