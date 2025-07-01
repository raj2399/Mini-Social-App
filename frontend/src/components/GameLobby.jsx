import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GameLobby({ onJoin }) {
  const [games, setGames] = useState([]);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/games').then(res => setGames(res.data));
  }, []);

  const handleJoin = async (game) => {
    setJoining(true);
    setError('');
    try {
      await axios.post('http://localhost:4000/api/wallet/deduct', {
        amount: game.entry,
        game: game.name
      });
      window.dispatchEvent(new Event('walletUpdate'));
      onJoin(game);
    } catch (e) {
      setError(e.response?.data?.error || 'Error joining game');
    }
    setJoining(false);
  };

  return (
    <div className="lobby">
      <h2>Game Lobby</h2>
      {error && <div className="error">{error}</div>}
      <div className="games">
        {games.map(game => (
          <div className="game-card" key={game.id}>
            <h3>{game.name}</h3>
            <p>Entry: <b>{game.entry} coins</b></p>
            <p>Players: {game.players}</p>
            <button disabled={joining} onClick={() => handleJoin(game)}>
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 