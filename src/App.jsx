import React from "react"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [diceArray, setDiceArray] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {

    const allHeld = diceArray.every(dice => dice.isHeld)
    const firstValue = diceArray[0].value
    const allSameValue = diceArray.every(dice => dice.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [diceArray])

  /*
    let count = 0
    let num

    diceArray.map(dice => {
      if(dice.isHeld) { count++ }
    })
    if(count === 10 ) {
      num = diceArray[0].value
      if(diceArray.every(dice => dice.value === num)) {
        setTenzies(true)
        console.log("You win!")
      }
    }
  */


  /*
    if(diceArray.every(dice => dice.isHeld)) {
      const firstValue = diceArray[0].value
      if(diceArray.every(dice => dice.value === firstValue)) {
        setTenzies(true)
        console.log("You win!")
      }
    }
  */

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i=0; i<10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies){
      setDiceArray(prevDiceArray => prevDiceArray.map(dice => {
        return dice.isHeld ?
          dice :
          generateNewDice()
      }))
    } else {
      newGame()
    }
  }

  function holdDice(id) {
    setDiceArray(prevDiceArray => prevDiceArray.map(dice => {
      return dice.id === id ?
      {...dice, isHeld: !dice.isHeld} :
      dice
    }))
  }

  function newGame() {
    setTenzies(false)
    setDiceArray(allNewDice())
  }

  const diceElements = diceArray.map(dice => (
    <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)} />

  ))
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are
      the same. Click each die to freeze it at
      its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" id="avc" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}
