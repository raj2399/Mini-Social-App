const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let user = {
  coins: 50,
  transactions: [
    { id: 1, type: 'credit', amount: 50, desc: 'Initial Coins', date: new Date().toISOString() }
  ]
};

const games = [
  { id: 1, name: 'Challenge & Connect', entry: 10, players: 3 },
  { id: 2, name: 'Snake & Ladder', entry: 15, players: 2 }
];

// Get wallet info
app.get('/api/wallet', (req, res) => {
  res.json({ coins: user.coins, transactions: user.transactions });
});

// Add coins
app.post('/api/wallet/recharge', (req, res) => {
  const { amount } = req.body;
  user.coins += amount;
  user.transactions.unshift({
    id: Date.now(),
    type: 'credit',
    amount,
    desc: 'Recharge',
    date: new Date().toISOString()
  });
  res.json({ coins: user.coins, transactions: user.transactions });
});

// Deduct coins for game
app.post('/api/wallet/deduct', (req, res) => {
  const { amount, game } = req.body;
  if (user.coins < amount) {
    return res.status(400).json({ error: 'Not enough coins' });
  }
  user.coins -= amount;
  user.transactions.unshift({
    id: Date.now(),
    type: 'debit',
    amount,
    desc: `Joined ${game}`,
    date: new Date().toISOString()
  });
  res.json({ coins: user.coins, transactions: user.transactions });
});

// Get games
app.get('/api/games', (req, res) => {
  res.json(games);
});

app.listen(4000, () => console.log('Backend running on http://localhost:4000')); 