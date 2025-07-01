import React, { useState } from 'react';
import GameLobby from './components/GameLobby';
import Wallet from './components/Wallet';
import GameScreen from './components/GameScreen';
import './App.css';

export default function App() {
  const [showGame, setShowGame] = useState(null);

  return (
    <div className="container">
      <header>
        <h1>Mini Social App</h1>
      </header>
      <Wallet />
      {showGame ? (
        <GameScreen game={showGame} onBack={() => setShowGame(null)} />
      ) : (
        <GameLobby onJoin={setShowGame} />
      )}
    </div>
  );
}
