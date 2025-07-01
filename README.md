# Mini Social App - Game Lobby & Wallet

## Tech Stack Used
- **Frontend:** React (Vite), CSS
- **Backend:** Node.js, Express
- **HTTP Client:** Axios
- **Styling:** Custom CSS (mobile-first, game-themed)
- **Mock Data:** In-memory (no database required)

## How to Run the Project

### 1. Clone the Repository
```
git clone https://github.com/raj2399/Mini-Social-App.git
cd Mini-Social-App
```

### 2. Start the Backend
```
cd backend
npm install
node server.js
```
The backend will run on [http://localhost:4000](http://localhost:4000)

### 3. Start the Frontend
```
cd frontend
npm install
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173)

> Make sure the backend is running before using the frontend.

## Features
- **Game Lobby:** Two games, entry coins, join button, player count, error if not enough coins.
- **Wallet:** Total coins, transaction history, recharge with coin packs, deduct coins on join.
- **Game Screen:** Fun dice roller or Snake & Ladder board preview.
- **Mobile-first, clean UI, easy to extend.**
- **All data mocked/in-memory, no DB needed.** 