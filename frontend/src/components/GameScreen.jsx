import React, { useState } from 'react';

const diceImgs = [
  'https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5f/Dice-2-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/b/b1/Dice-3-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/fd/Dice-4-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Dice-5-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/26/Dice-6-b.svg'
];

export default function GameScreen({ game, onBack }) {
  const [dice, setDice] = useState(0);

  const rollDice = () => {
    setDice(Math.floor(Math.random() * 6));
  };

  return (
    <div className="game-screen">
      <h2>{game.name}</h2>
      <p>Let's play a quick dice roll!</p>
      <img
        src={diceImgs[dice]}
        alt={`Dice ${dice + 1}`}
        style={{ width: 80, height: 80, margin: '1rem auto', display: 'block' }}
      />
      <button onClick={rollDice} style={{ marginBottom: '1rem' }}>
        Roll Dice
      </button>
      <br />
      <button onClick={onBack}>Back to Lobby</button>
    </div>
  );
} 